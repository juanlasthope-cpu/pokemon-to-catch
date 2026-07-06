// ================================================================
//  SUPABASE INTEGRATION
//  All database reads/writes go through this file.
//  The anon key is safe to be public — security is enforced
//  by Row Level Security policies in the database.
// ================================================================

const SUPABASE_URL  = 'https://pclnperzcvjpvnqkrbao.supabase.co';
const SUPABASE_ANON = 'sb_publishable_PAhrW6eYQJlQzqWN4pWZcQ_ddttzM-J';

// Load Supabase client from CDN (loaded in index.html before this file)
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ── AUTH ─────────────────────────────────────────────────────────────────────

const SB = {

  // Current session
  session: null,

  async init() {
    const { data } = await _sb.auth.getSession();
    this.session = data.session;
    _sb.auth.onAuthStateChange((event, session) => {
      this.session = session;
      if (typeof refreshAdminUI === 'function') refreshAdminUI();
    });
  },

  isAdmin() {
    return !!this.session;
  },

  async signIn(email, password) {
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    this.session = data.session;
    return data;
  },

  async signOut() {
    await _sb.auth.signOut();
    this.session = null;
  },

  // ── RATINGS ──────────────────────────────────────────────────────────────

  // Load all community ratings → returns { pokemonId_format: tier }
  async loadRatings() {
    const { data, error } = await _sb.from('ratings').select('pokemon_id, format, tier');
    if (error) { console.error('loadRatings:', error); return {}; }
    const map = {};
    for (const row of data) {
      if (!map[row.pokemon_id]) map[row.pokemon_id] = {};
      map[row.pokemon_id][row.format] = row.tier;
    }
    return map;
  },

  // Load admin personal ratings
  async loadAdminRatings() {
    if (!this.isAdmin()) return {};
    const { data, error } = await _sb.from('admin_ratings').select('pokemon_id, format, tier');
    if (error) { console.error('loadAdminRatings:', error); return {}; }
    const map = {};
    for (const row of data) {
      if (!map[row.pokemon_id]) map[row.pokemon_id] = {};
      map[row.pokemon_id][row.format] = row.tier;
    }
    return map;
  },

  // Upsert a community rating
  async setRating(pokemonId, pokemonName, format, tier) {
    const { error } = await _sb.from('ratings').upsert(
      { pokemon_id: pokemonId, pokemon_name: pokemonName, format, tier, updated_at: new Date().toISOString() },
      { onConflict: 'pokemon_id,format' }
    );
    if (error) throw error;
  },

  // Upsert a personal admin rating
  async setAdminRating(pokemonId, format, tier) {
    const { error } = await _sb.from('admin_ratings').upsert(
      { pokemon_id: pokemonId, format, tier, updated_at: new Date().toISOString() },
      { onConflict: 'pokemon_id,format' }
    );
    if (error) throw error;
  },

  // Bulk import community ratings
  async importRatings(ratingsArray) {
    // ratingsArray: [{ pokemon_id, pokemon_name, format, tier }]
    const chunks = [];
    for (let i = 0; i < ratingsArray.length; i += 500) chunks.push(ratingsArray.slice(i, i+500));
    for (const chunk of chunks) {
      const { error } = await _sb.from('ratings').upsert(chunk, { onConflict: 'pokemon_id,format' });
      if (error) throw error;
    }
  },

  // ── NOTES ────────────────────────────────────────────────────────────────

  async loadNotes() {
    const { data, error } = await _sb.from('notes').select('pokemon_id, content');
    if (error) { console.error('loadNotes:', error); return {}; }
    const map = {};
    for (const row of data) map[row.pokemon_id] = row.content;
    return map;
  },

  async setNote(pokemonId, content) {
    const { error } = await _sb.from('notes').upsert(
      { pokemon_id: pokemonId, content, updated_at: new Date().toISOString() },
      { onConflict: 'pokemon_id' }
    );
    if (error) throw error;
  },

  // ── FLAGS ─────────────────────────────────────────────────────────────────

  async loadFlags() {
    const { data, error } = await _sb.from('pokemon_flags').select('*');
    if (error) { console.error('loadFlags:', error); return {}; }
    const map = {};
    for (const row of data) map[row.pokemon_id] = row;
    return map;
  },

  async setFlag(pokemonId, flags) {
    const { error } = await _sb.from('pokemon_flags').upsert(
      { pokemon_id: pokemonId, ...flags, updated_at: new Date().toISOString() },
      { onConflict: 'pokemon_id' }
    );
    if (error) throw error;
  },

  // ── VOTES ─────────────────────────────────────────────────────────────────

  async loadVotes() {
    const [votesRes, upvotesRes, castsRes] = await Promise.all([
      _sb.from('votes').select('*'),
      _sb.from('vote_upvotes').select('vote_id, voter_id, created_at'),
      _sb.from('vote_casts').select('vote_id, voter_id, tier, created_at'),
    ]);
    if (votesRes.error) { console.error('loadVotes:', votesRes.error); return {}; }

    const map = {};
    for (const v of votesRes.data) {
      map[v.id] = {
        ...v,
        upvotes: {},
        votes: {},
        key: v.pokemon_id + '__' + v.format,
      };
    }

    for (const u of (upvotesRes.data||[])) {
      if (map[u.vote_id]) map[u.vote_id].upvotes[u.voter_id] = u.created_at;
    }

    for (const c of (castsRes.data||[])) {
      if (map[c.vote_id]) {
        if (!map[c.vote_id].votes[c.tier]) map[c.vote_id].votes[c.tier] = {};
        map[c.vote_id].votes[c.tier][c.voter_id] = c.created_at;
      }
    }

    // Re-key by pokemon_id__format for easy lookup
    const byKey = {};
    for (const v of Object.values(map)) byKey[v.key] = v;
    return byKey;
  },

  async createVote(pokemonId, pokemonName, format, currentTier, voterId) {
    const { data, error } = await _sb.from('votes').insert({
      pokemon_id: pokemonId, pokemon_name: pokemonName,
      format, current_tier: currentTier, status: 'suggestion'
    }).select().single();
    if (error) throw error;
    // Auto-upvote from suggester
    await _sb.from('vote_upvotes').insert({ vote_id: data.id, voter_id: voterId });
    return data;
  },

  async upvoteVote(voteId, voterId, currentUpvoteCount) {
    await _sb.from('vote_upvotes').insert({ vote_id: voteId, voter_id: voterId });
    // Check if threshold reached
    if (currentUpvoteCount + 1 >= 3) {
      await _sb.from('votes').update({ status: 'open' }).eq('id', voteId);
    }
  },

  async castVote(voteId, voterId, tier, currentTotalVotes) {
    await _sb.from('vote_casts').upsert(
      { vote_id: voteId, voter_id: voterId, tier },
      { onConflict: 'vote_id,voter_id' }
    );
    if (currentTotalVotes + 1 >= 100) {
      await _sb.from('votes').update({ status: 'pending', closed_at: new Date().toISOString() }).eq('id', voteId);
    }
  },

  async closeVote(voteId) {
    await _sb.from('votes').update({ status: 'pending', closed_at: new Date().toISOString() }).eq('id', voteId);
  },

  async acceptVote(voteId, tier, pokemonId, pokemonName, format) {
    await _sb.from('votes').update({ status: 'accepted', result_tier: tier }).eq('id', voteId);
    await this.setRating(pokemonId, pokemonName, format, tier);
  },

  async rejectVote(voteId) {
    await _sb.from('votes').update({ status: 'rejected' }).eq('id', voteId);
  },

  async deleteVote(voteId) {
    await _sb.from('votes').delete().eq('id', voteId);
  },

  // ── NOTE SUGGESTIONS ──────────────────────────────────────────────────────

  async loadNoteSuggestions() {
    const { data, error } = await _sb.from('note_suggestions').select('*').eq('status', 'pending');
    if (error) { console.error('loadNoteSuggestions:', error); return []; }
    return data;
  },

  async submitNoteSuggestion(pokemonId, pokemonName, content, voterId) {
    const { error } = await _sb.from('note_suggestions').insert({
      pokemon_id: pokemonId, pokemon_name: pokemonName, content, voter_id: voterId
    });
    if (error) throw error;
  },

  async acceptNoteSuggestion(id, pokemonId, content) {
    // Append to existing note
    const { data } = await _sb.from('notes').select('content').eq('pokemon_id', pokemonId).single();
    const existing = data?.content || '';
    const newContent = existing ? existing + '\n' + content : content;
    await this.setNote(pokemonId, newContent);
    await _sb.from('note_suggestions').update({ status: 'accepted' }).eq('id', id);
  },

  async rejectNoteSuggestion(id) {
    await _sb.from('note_suggestions').update({ status: 'rejected' }).eq('id', id);
  },

  // ── FEEDBACK ─────────────────────────────────────────────────────────────

  async submitFeedback(type, content) {
    const { error } = await _sb.from('feedback').insert({ type, content });
    if (error) throw error;
  },

  async loadFeedback() {
    if (!this.isAdmin()) return [];
    const { data, error } = await _sb.from('feedback').select('*').order('created_at', { ascending: false });
    if (error) { console.error('loadFeedback:', error); return []; }
    return data;
  },

  // ── WATCHLIST (logged-in users) ───────────────────────────────────────────

  async loadUserWatchlist() {
    if (!this.session) return new Set();
    const { data, error } = await _sb.from('watchlists').select('pokemon_id').eq('user_id', this.session.user.id);
    if (error) { console.error('loadUserWatchlist:', error); return new Set(); }
    return new Set(data.map(r => r.pokemon_id));
  },

  async addToWatchlist(pokemonId) {
    if (!this.session) return;
    await _sb.from('watchlists').insert({ user_id: this.session.user.id, pokemon_id: pokemonId });
  },

  async removeFromWatchlist(pokemonId) {
    if (!this.session) return;
    await _sb.from('watchlists').delete()
      .eq('user_id', this.session.user.id)
      .eq('pokemon_id', pokemonId);
  },

};
