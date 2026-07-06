/* ================================================================
    ╔══════════════════════════════════════════════════════════════╗
    ║  ADMIN PASSWORD — change this to whatever you want          ║
    ║                                                              ║
    ║  When you upgrade to a hosted login system later, this      ║
    ║  entire AUTH section gets replaced with an API call.        ║
    ║  Everything else in the file stays the same.                ║
    ╚══════════════════════════════════════════════════════════════╝ */
  // Admin password removed — authentication handled by Supabase

  /* ================================================================
    AUTH — swap this section out when moving to a real backend
  ================================================================ */
  // Auth is handled by Supabase — see supabase.js
  const Auth = {
    isLoggedIn() { return SB.isAdmin(); },
    async login(email, password) { return await SB.signIn(email, password); },
    async logout() { await SB.signOut(); }
  };

  /* ================================================================
    CONFIG
  ================================================================ */
  const FORMATS = ['Raids', 'Great League', 'Ultra League', 'Master League', 'Gym Defense'];

  /* ================================================================
    EVOLUTION ANCESTRY MAP
    Built from PvPoke gamemaster data. Maps each Pokémon name to all
    downstream evolutions it can become (transitively).
  ================================================================ */
  const EVO_ANCESTRY = {"Bulbasaur":["Venusaur","Ivysaur"],"Bulbasaur (Shadow)":["Ivysaur (Shadow)","Venusaur (Shadow)"],"Ivysaur":["Venusaur"],"Ivysaur (Shadow)":["Venusaur (Shadow)"],"Charmander":["Charizard","Charmeleon"],"Charmander (Shadow)":["Charmeleon (Shadow)","Charizard (Shadow)"],"Charmeleon":["Charizard"],"Charmeleon (Shadow)":["Charizard (Shadow)"],"Squirtle":["Wartortle","Blastoise"],"Squirtle (Shadow)":["Blastoise (Shadow)","Wartortle (Shadow)"],"Wartortle":["Blastoise"],"Wartortle (Shadow)":["Blastoise (Shadow)"],"Caterpie":["Butterfree","Metapod"],"Caterpie (Shadow)":["Metapod (Shadow)","Butterfree (Shadow)"],"Metapod":["Butterfree"],"Metapod (Shadow)":["Butterfree (Shadow)"],"Weedle":["Beedrill","Kakuna"],"Weedle (Shadow)":["Kakuna (Shadow)","Beedrill (Shadow)"],"Kakuna":["Beedrill"],"Kakuna (Shadow)":["Beedrill (Shadow)"],"Pidgey":["Pidgeot","Pidgeotto"],"Pidgey (Shadow)":["Pidgeot (Shadow)","Pidgeotto (Shadow)"],"Pidgeotto":["Pidgeot"],"Pidgeotto (Shadow)":["Pidgeot (Shadow)"],"Rattata":["Raticate"],"Rattata (Alolan)":["Raticate (Alolan)"],"Rattata (Alolan) (Shadow)":["Raticate (Alolan) (Shadow)"],"Rattata (Shadow)":["Raticate (Shadow)"],"Spearow":["Fearow"],"Ekans":["Arbok"],"Ekans (Shadow)":["Arbok (Shadow)"],"Pikachu":["Raichu"],"Pikachu (Shaymin Scarf)":["Raichu"],"Sandshrew":["Sandslash"],"Sandshrew (Alolan)":["Sandslash (Alolan)"],"Sandshrew (Alolan) (Shadow)":["Sandslash (Alolan) (Shadow)"],"Sandshrew (Shadow)":["Sandslash (Shadow)"],"Nidoran Female":["Nidoqueen","Nidorina"],"Nidoran Female (Shadow)":["Nidorina (Shadow)","Nidoqueen (Shadow)"],"Nidorina":["Nidoqueen"],"Nidorina (Shadow)":["Nidoqueen (Shadow)"],"Nidoran Male":["Nidoking","Nidorino"],"Nidoran Male (Shadow)":["Nidorino (Shadow)","Nidoking (Shadow)"],"Nidorino":["Nidoking"],"Nidorino (Shadow)":["Nidoking (Shadow)"],"Clefairy":["Clefable"],"Vulpix":["Ninetales"],"Vulpix (Alolan)":["Ninetales (Alolan)"],"Vulpix (Alolan) (Shadow)":["Ninetales (Alolan) (Shadow)"],"Vulpix (Shadow)":["Ninetales (Shadow)"],"Jigglypuff":["Wigglytuff"],"Zubat":["Golbat","Crobat"],"Zubat (Shadow)":["Golbat (Shadow)","Crobat (Shadow)"],"Golbat":["Crobat"],"Golbat (Shadow)":["Crobat (Shadow)"],"Oddish":["Gloom","Bellossom","Vileplume"],"Oddish (Shadow)":["Gloom (Shadow)","Vileplume (Shadow)","Bellossom (Shadow)"],"Gloom":["Bellossom","Vileplume"],"Gloom (Shadow)":["Vileplume (Shadow)","Bellossom (Shadow)"],"Paras":["Parasect"],"Venonat":["Venomoth"],"Venonat (Shadow)":["Venomoth (Shadow)"],"Diglett":["Dugtrio"],"Diglett (Alolan)":["Dugtrio (Alolan)"],"Diglett (Alolan) (Shadow)":["Dugtrio (Alolan) (Shadow)"],"Diglett (Shadow)":["Dugtrio (Shadow)"],"Meowth":["Persian"],"Meowth (Alolan)":["Persian (Alolan)"],"Meowth (Galarian)":["Perrserker"],"Meowth (Shadow)":["Persian (Shadow)"],"Psyduck":["Golduck"],"Psyduck (Shadow)":["Golduck (Shadow)"],"Mankey":["Annihilape","Primeape"],"Mankey (Shadow)":["Primeape (Shadow)","Annihilape (Shadow)"],"Primeape":["Annihilape"],"Primeape (Shadow)":["Annihilape (Shadow)"],"Growlithe":["Arcanine"],"Growlithe (Hisuian)":["Arcanine (Hisuian)"],"Growlithe (Shadow)":["Arcanine (Shadow)"],"Poliwag":["Poliwhirl","Politoed","Poliwrath"],"Poliwag (Shadow)":["Politoed (Shadow)","Poliwrath (Shadow)","Poliwhirl (Shadow)"],"Poliwhirl":["Politoed","Poliwrath"],"Poliwhirl (Shadow)":["Politoed (Shadow)","Poliwrath (Shadow)"],"Abra":["Kadabra","Alakazam"],"Abra (Shadow)":["Alakazam (Shadow)","Kadabra (Shadow)"],"Kadabra":["Alakazam"],"Kadabra (Shadow)":["Alakazam (Shadow)"],"Machop":["Machamp","Machoke"],"Machop (Shadow)":["Machoke (Shadow)","Machamp (Shadow)"],"Machoke":["Machamp"],"Machoke (Shadow)":["Machamp (Shadow)"],"Bellsprout":["Weepinbell","Victreebel"],"Bellsprout (Shadow)":["Victreebel (Shadow)","Weepinbell (Shadow)"],"Weepinbell":["Victreebel"],"Weepinbell (Shadow)":["Victreebel (Shadow)"],"Tentacool":["Tentacruel"],"Tentacool (Shadow)":["Tentacruel (Shadow)"],"Geodude":["Golem","Graveler"],"Geodude (Alolan)":["Golem (Alolan)","Graveler (Alolan)"],"Geodude (Alolan) (Shadow)":["Graveler (Alolan) (Shadow)","Golem (Alolan) (Shadow)"],"Geodude (Shadow)":["Graveler (Shadow)","Golem (Shadow)"],"Graveler":["Golem"],"Graveler (Alolan)":["Golem (Alolan)"],"Graveler (Alolan) (Shadow)":["Golem (Alolan) (Shadow)"],"Graveler (Shadow)":["Golem (Shadow)"],"Ponyta":["Rapidash"],"Ponyta (Galarian)":["Rapidash (Galarian)"],"Ponyta (Shadow)":["Rapidash (Shadow)"],"Slowpoke":["Slowbro","Slowking"],"Slowpoke (Galarian)":["Slowking (Galarian)","Slowbro (Galarian)"],"Slowpoke (Shadow)":["Slowking (Shadow)","Slowbro (Shadow)"],"Magnemite":["Magnezone","Magneton"],"Magnemite (Shadow)":["Magneton (Shadow)","Magnezone (Shadow)"],"Magneton":["Magnezone"],"Magneton (Shadow)":["Magnezone (Shadow)"],"Farfetch'd (Galarian)":["Sirfetch'd"],"Doduo":["Dodrio"],"Seel":["Dewgong"],"Grimer":["Muk"],"Grimer (Alolan)":["Muk (Alolan)"],"Grimer (Alolan) (Shadow)":["Muk (Alolan) (Shadow)"],"Grimer (Shadow)":["Muk (Shadow)"],"Shellder":["Cloyster"],"Shellder (Shadow)":["Cloyster (Shadow)"],"Gastly":["Gengar","Haunter"],"Gastly (Shadow)":["Haunter (Shadow)","Gengar (Shadow)"],"Haunter":["Gengar"],"Haunter (Shadow)":["Gengar (Shadow)"],"Onix":["Steelix"],"Onix (Shadow)":["Steelix (Shadow)"],"Drowzee":["Hypno"],"Drowzee (Shadow)":["Hypno (Shadow)"],"Krabby":["Kingler"],"Voltorb":["Electrode"],"Voltorb (Hisuian)":["Electrode (Hisuian)"],"Voltorb (Shadow)":["Electrode (Shadow)"],"Exeggcute":["Exeggutor"],"Exeggcute (Shadow)":["Exeggutor (Shadow)"],"Cubone":["Marowak","Marowak (Alolan)"],"Cubone (Shadow)":["Marowak (Alolan) (Shadow)","Marowak (Shadow)"],"Lickitung":["Lickilicky"],"Koffing":["Weezing"],"Koffing (Shadow)":["Weezing (Shadow)"],"Rhyhorn":["Rhydon","Rhyperior"],"Rhyhorn (Shadow)":["Rhydon (Shadow)","Rhyperior (Shadow)"],"Rhydon":["Rhyperior"],"Rhydon (Shadow)":["Rhyperior (Shadow)"],"Chansey":["Blissey"],"Tangela":["Tangrowth"],"Tangela (Shadow)":["Tangrowth (Shadow)"],"Horsea":["Seadra","Kingdra"],"Horsea (Shadow)":["Seadra (Shadow)","Kingdra (Shadow)"],"Seadra":["Kingdra"],"Seadra (Shadow)":["Kingdra (Shadow)"],"Goldeen":["Seaking"],"Staryu":["Starmie"],"Staryu (Shadow)":["Starmie (Shadow)"],"Mr. Mime (Galarian)":["Mr. Rime"],"Scyther":["Kleavor","Scizor"],"Scyther (Shadow)":["Scizor (Shadow)"],"Electabuzz":["Electivire"],"Electabuzz (Shadow)":["Electivire (Shadow)"],"Magmar":["Magmortar"],"Magmar (Shadow)":["Magmortar (Shadow)"],"Magikarp":["Gyarados"],"Magikarp (Shadow)":["Gyarados (Shadow)"],"Eevee":["Vaporeon","Leafeon","Glaceon","Jolteon","Espeon","Flareon","Umbreon","Sylveon"],"Porygon":["Porygon2","Porygon-Z"],"Porygon (Shadow)":["Porygon-Z (Shadow)","Porygon2 (Shadow)"],"Omanyte":["Omastar"],"Omanyte (Shadow)":["Omastar (Shadow)"],"Kabuto":["Kabutops"],"Kabuto (Shadow)":["Kabutops (Shadow)"],"Dratini":["Dragonite","Dragonair"],"Dratini (Shadow)":["Dragonair (Shadow)","Dragonite (Shadow)"],"Dragonair":["Dragonite"],"Dragonair (Shadow)":["Dragonite (Shadow)"],"Chikorita":["Meganium","Bayleef"],"Chikorita (Shadow)":["Bayleef (Shadow)","Meganium (Shadow)"],"Bayleef":["Meganium"],"Bayleef (Shadow)":["Meganium (Shadow)"],"Cyndaquil":["Quilava","Typhlosion"],"Cyndaquil (Shadow)":["Typhlosion (Shadow)","Quilava (Shadow)"],"Quilava":["Typhlosion"],"Quilava (Shadow)":["Typhlosion (Shadow)"],"Totodile":["Croconaw","Feraligatr"],"Totodile (Shadow)":["Feraligatr (Shadow)","Croconaw (Shadow)"],"Croconaw":["Feraligatr"],"Croconaw (Shadow)":["Feraligatr (Shadow)"],"Sentret":["Furret"],"Hoothoot":["Noctowl"],"Ledyba":["Ledian"],"Ledyba (Shadow)":["Ledian (Shadow)"],"Spinarak":["Ariados"],"Chinchou":["Lanturn"],"Pichu":["Pikachu","Raichu"],"Cleffa":["Clefable","Clefairy"],"Igglybuff":["Jigglypuff","Wigglytuff"],"Togepi":["Togekiss","Togetic"],"Togetic":["Togekiss"],"Natu":["Xatu"],"Natu (Shadow)":["Xatu (Shadow)"],"Mareep":["Ampharos","Flaaffy"],"Mareep (Shadow)":["Flaaffy (Shadow)","Ampharos (Shadow)"],"Flaaffy":["Ampharos"],"Flaaffy (Shadow)":["Ampharos (Shadow)"],"Marill":["Azumarill"],"Hoppip":["Skiploom","Jumpluff"],"Hoppip (Shadow)":["Jumpluff (Shadow)","Skiploom (Shadow)"],"Skiploom":["Jumpluff"],"Skiploom (Shadow)":["Jumpluff (Shadow)"],"Aipom":["Ambipom"],"Aipom (Shadow)":["Ambipom (Shadow)"],"Sunkern":["Sunflora"],"Yanma":["Yanmega"],"Wooper":["Quagsire"],"Wooper (Paldean)":["Clodsire"],"Wooper (Shadow)":["Quagsire (Shadow)"],"Murkrow":["Honchkrow"],"Murkrow (Shadow)":["Honchkrow (Shadow)"],"Misdreavus":["Mismagius"],"Misdreavus (Shadow)":["Mismagius (Shadow)"],"Girafarig":["Farigiraf"],"Pineco":["Forretress"],"Pineco (Shadow)":["Forretress (Shadow)"],"Dunsparce":["Dudunsparce"],"Gligar":["Gliscor"],"Gligar (Shadow)":["Gliscor (Shadow)"],"Snubbull":["Granbull"],"Snubbull (Shadow)":["Granbull (Shadow)"],"Qwilfish (Hisuian)":["Overqwil"],"Sneasel":["Weavile"],"Sneasel (Hisuian)":["Sneasler"],"Sneasel (Hisuian) (Shadow)":["Sneasler (Shadow)"],"Sneasel (Shadow)":["Weavile (Shadow)"],"Teddiursa":["Ursaluna","Ursaring"],"Teddiursa (Shadow)":["Ursaring (Shadow)","Ursaluna (Shadow)"],"Ursaring":["Ursaluna"],"Ursaring (Shadow)":["Ursaluna (Shadow)"],"Slugma":["Magcargo"],"Swinub":["Piloswine","Mamoswine"],"Swinub (Shadow)":["Piloswine (Shadow)","Mamoswine (Shadow)"],"Piloswine":["Mamoswine"],"Piloswine (Shadow)":["Mamoswine (Shadow)"],"Remoraid":["Octillery"],"Houndour":["Houndoom"],"Houndour (Shadow)":["Houndoom (Shadow)"],"Phanpy":["Donphan"],"Phanpy (Shadow)":["Donphan (Shadow)"],"Porygon2":["Porygon-Z"],"Porygon2 (Shadow)":["Porygon-Z (Shadow)"],"Stantler":["Wyrdeer"],"Tyrogue":["Hitmonlee","Hitmontop","Hitmonchan"],"Smoochum":["Jynx"],"Elekid":["Electabuzz","Electivire"],"Magby":["Magmar","Magmortar"],"Larvitar":["Pupitar","Tyranitar"],"Larvitar (Shadow)":["Pupitar (Shadow)","Tyranitar (Shadow)"],"Pupitar":["Tyranitar"],"Pupitar (Shadow)":["Tyranitar (Shadow)"],"Treecko":["Grovyle","Sceptile"],"Treecko (Shadow)":["Sceptile (Shadow)","Grovyle (Shadow)"],"Grovyle":["Sceptile"],"Grovyle (Shadow)":["Sceptile (Shadow)"],"Torchic":["Combusken","Blaziken"],"Torchic (Shadow)":["Blaziken (Shadow)","Combusken (Shadow)"],"Combusken":["Blaziken"],"Combusken (Shadow)":["Blaziken (Shadow)"],"Mudkip":["Marshtomp","Swampert"],"Mudkip (Shadow)":["Marshtomp (Shadow)","Swampert (Shadow)"],"Marshtomp":["Swampert"],"Marshtomp (Shadow)":["Swampert (Shadow)"],"Poochyena":["Mightyena"],"Poochyena (Shadow)":["Mightyena (Shadow)"],"Zigzagoon":["Linoone"],"Zigzagoon (Galarian)":["Obstagoon","Linoone (Galarian)"],"Zigzagoon (Galarian) (Shadow)":["Obstagoon (Shadow)","Linoone (Galarian) (Shadow)"],"Linoone (Galarian)":["Obstagoon"],"Linoone (Galarian) (Shadow)":["Obstagoon (Shadow)"],"Wurmple":["Dustox","Cascoon","Silcoon","Beautifly"],"Silcoon":["Beautifly"],"Cascoon":["Dustox"],"Lotad":["Ludicolo","Lombre"],"Lombre":["Ludicolo"],"Seedot":["Nuzleaf","Shiftry"],"Seedot (Shadow)":["Nuzleaf (Shadow)","Shiftry (Shadow)"],"Nuzleaf":["Shiftry"],"Nuzleaf (Shadow)":["Shiftry (Shadow)"],"Taillow":["Swellow"],"Taillow (Shadow)":["Swellow (Shadow)"],"Wingull":["Pelipper"],"Ralts":["Gardevoir","Gallade","Kirlia"],"Ralts (Shadow)":["Gardevoir (Shadow)","Kirlia (Shadow)","Gallade (Shadow)"],"Kirlia":["Gardevoir","Gallade"],"Kirlia (Shadow)":["Gardevoir (Shadow)","Gallade (Shadow)"],"Surskit":["Masquerain"],"Shroomish":["Breloom"],"Slakoth":["Slaking","Vigoroth"],"Slakoth (Shadow)":["Slaking (Shadow)","Vigoroth (Shadow)"],"Vigoroth":["Slaking"],"Vigoroth (Shadow)":["Slaking (Shadow)"],"Nincada":["Ninjask"],"Whismur":["Exploud","Loudred"],"Whismur (Shadow)":["Loudred (Shadow)","Exploud (Shadow)"],"Loudred":["Exploud"],"Loudred (Shadow)":["Exploud (Shadow)"],"Makuhita":["Hariyama"],"Makuhita (Shadow)":["Hariyama (Shadow)"],"Azurill":["Marill","Azumarill"],"Nosepass":["Probopass"],"Nosepass (Shadow)":["Probopass (Shadow)"],"Skitty":["Delcatty"],"Aron":["Aggron","Lairon"],"Aron (Shadow)":["Aggron (Shadow)","Lairon (Shadow)"],"Lairon":["Aggron"],"Lairon (Shadow)":["Aggron (Shadow)"],"Meditite":["Medicham"],"Electrike":["Manectric"],"Electrike (Shadow)":["Manectric (Shadow)"],"Roselia":["Roserade"],"Gulpin":["Swalot"],"Carvanha":["Sharpedo"],"Carvanha (Shadow)":["Sharpedo (Shadow)"],"Wailmer":["Wailord"],"Wailmer (Shadow)":["Wailord (Shadow)"],"Numel":["Camerupt"],"Numel (Shadow)":["Camerupt (Shadow)"],"Spoink":["Grumpig"],"Spoink (Shadow)":["Grumpig (Shadow)"],"Trapinch":["Flygon","Vibrava"],"Trapinch (Shadow)":["Flygon (Shadow)","Vibrava (Shadow)"],"Vibrava":["Flygon"],"Vibrava (Shadow)":["Flygon (Shadow)"],"Cacnea":["Cacturne"],"Cacnea (Shadow)":["Cacturne (Shadow)"],"Swablu":["Altaria"],"Swablu (Shadow)":["Altaria (Shadow)"],"Barboach":["Whiscash"],"Barboach (Shadow)":["Whiscash (Shadow)"],"Corphish":["Crawdaunt"],"Corphish (Shadow)":["Crawdaunt (Shadow)"],"Baltoy":["Claydol"],"Baltoy (Shadow)":["Claydol (Shadow)"],"Lileep":["Cradily"],"Lileep (Shadow)":["Cradily (Shadow)"],"Anorith":["Armaldo"],"Anorith (Shadow)":["Armaldo (Shadow)"],"Feebas":["Milotic"],"Feebas (Shadow)":["Milotic (Shadow)"],"Shuppet":["Banette"],"Shuppet (Shadow)":["Banette (Shadow)"],"Duskull":["Dusknoir","Dusclops"],"Duskull (Shadow)":["Dusclops (Shadow)","Dusknoir (Shadow)"],"Dusclops":["Dusknoir"],"Dusclops (Shadow)":["Dusknoir (Shadow)"],"Wynaut":["Wobbuffet"],"Snorunt":["Glalie","Froslass"],"Snorunt (Shadow)":["Glalie (Shadow)","Froslass (Shadow)"],"Spheal":["Sealeo","Walrein"],"Spheal (Shadow)":["Sealeo (Shadow)","Walrein (Shadow)"],"Sealeo":["Walrein"],"Sealeo (Shadow)":["Walrein (Shadow)"],"Clamperl":["Gorebyss","Huntail"],"Bagon":["Shelgon","Salamence"],"Bagon (Shadow)":["Salamence (Shadow)","Shelgon (Shadow)"],"Shelgon":["Salamence"],"Shelgon (Shadow)":["Salamence (Shadow)"],"Beldum":["Metagross","Metang"],"Beldum (Shadow)":["Metang (Shadow)","Metagross (Shadow)"],"Metang":["Metagross"],"Metang (Shadow)":["Metagross (Shadow)"],"Turtwig":["Grotle","Torterra"],"Turtwig (Shadow)":["Torterra (Shadow)","Grotle (Shadow)"],"Grotle":["Torterra"],"Grotle (Shadow)":["Torterra (Shadow)"],"Chimchar":["Infernape","Monferno"],"Chimchar (Shadow)":["Monferno (Shadow)","Infernape (Shadow)"],"Monferno":["Infernape"],"Monferno (Shadow)":["Infernape (Shadow)"],"Piplup":["Empoleon","Prinplup"],"Piplup (Shadow)":["Empoleon (Shadow)","Prinplup (Shadow)"],"Prinplup":["Empoleon"],"Prinplup (Shadow)":["Empoleon (Shadow)"],"Starly":["Staravia","Staraptor"],"Starly (Shadow)":["Staravia (Shadow)","Staraptor (Shadow)"],"Staravia":["Staraptor"],"Staravia (Shadow)":["Staraptor (Shadow)"],"Bidoof":["Bibarel"],"Bidoof (Shadow)":["Bibarel (Shadow)"],"Kricketot":["Kricketune"],"Shinx":["Luxray","Luxio"],"Shinx (Shadow)":["Luxio (Shadow)","Luxray (Shadow)"],"Luxio":["Luxray"],"Luxio (Shadow)":["Luxray (Shadow)"],"Budew":["Roserade","Roselia"],"Cranidos":["Rampardos"],"Cranidos (Shadow)":["Rampardos (Shadow)"],"Shieldon":["Bastiodon"],"Shieldon (Shadow)":["Bastiodon (Shadow)"],"Burmy (Plant)":["Wormadam (Plant)","Mothim"],"Burmy (Sandy)":["Wormadam (Sandy)","Mothim"],"Burmy (Trash)":["Wormadam (Trash)","Mothim"],"Combee":["Vespiquen"],"Buizel":["Floatzel"],"Cherubi":["Cherrim (Sunshine)","Cherrim (Overcast)"],"Shellos":["Gastrodon"],"Drifloon":["Drifblim"],"Drifloon (Shadow)":["Drifblim (Shadow)"],"Buneary":["Lopunny"],"Glameow":["Purugly"],"Glameow (Shadow)":["Purugly (Shadow)"],"Chingling":["Chimecho"],"Stunky":["Skuntank"],"Stunky (Shadow)":["Skuntank (Shadow)"],"Bronzor":["Bronzong"],"Bonsly":["Sudowoodo"],"Mime (Jr)":["Mr. Mime"],"Happiny":["Blissey","Chansey"],"Gible":["Garchomp","Gabite"],"Gible (Shadow)":["Garchomp (Shadow)","Gabite (Shadow)"],"Gabite":["Garchomp"],"Gabite (Shadow)":["Garchomp (Shadow)"],"Munchlax":["Snorlax"],"Riolu":["Lucario"],"Hippopotas":["Hippowdon"],"Hippopotas (Shadow)":["Hippowdon (Shadow)"],"Skorupi":["Drapion"],"Skorupi (Shadow)":["Drapion (Shadow)"],"Croagunk":["Toxicroak"],"Croagunk (Shadow)":["Toxicroak (Shadow)"],"Finneon":["Lumineon"],"Mantyke":["Mantine"],"Snover":["Abomasnow"],"Snover (Shadow)":["Abomasnow (Shadow)"],"Snivy":["Servine","Serperior"],"Snivy (Shadow)":["Servine (Shadow)","Serperior (Shadow)"],"Servine":["Serperior"],"Servine (Shadow)":["Serperior (Shadow)"],"Tepig":["Pignite","Emboar"],"Tepig (Shadow)":["Emboar (Shadow)","Pignite (Shadow)"],"Pignite":["Emboar"],"Pignite (Shadow)":["Emboar (Shadow)"],"Oshawott":["Dewott","Samurott"],"Oshawott (Shadow)":["Dewott (Shadow)","Samurott (Shadow)"],"Dewott":["Samurott"],"Dewott (Shadow)":["Samurott (Shadow)"],"Patrat":["Watchog"],"Patrat (Shadow)":["Watchog (Shadow)"],"Lillipup":["Herdier","Stoutland"],"Herdier":["Stoutland"],"Purrloin":["Liepard"],"Purrloin (Shadow)":["Liepard (Shadow)"],"Pansage":["Simisage"],"Pansear":["Simisear"],"Panpour":["Simipour"],"Munna":["Musharna"],"Pidove":["Unfezant","Tranquill"],"Pidove (Shadow)":["Tranquill (Shadow)","Unfezant (Shadow)"],"Tranquill":["Unfezant"],"Tranquill (Shadow)":["Unfezant (Shadow)"],"Blitzle":["Zebstrika"],"Blitzle (Shadow)":["Zebstrika (Shadow)"],"Roggenrola":["Boldore","Gigalith"],"Roggenrola (Shadow)":["Boldore (Shadow)","Gigalith (Shadow)"],"Boldore":["Gigalith"],"Boldore (Shadow)":["Gigalith (Shadow)"],"Woobat":["Swoobat"],"Drilbur":["Excadrill"],"Drilbur (Shadow)":["Excadrill (Shadow)"],"Timburr":["Conkeldurr","Gurdurr"],"Timburr (Shadow)":["Gurdurr (Shadow)","Conkeldurr (Shadow)"],"Gurdurr":["Conkeldurr"],"Gurdurr (Shadow)":["Conkeldurr (Shadow)"],"Tympole":["Palpitoad","Seismitoad"],"Palpitoad":["Seismitoad"],"Sewaddle":["Leavanny","Swadloon"],"Swadloon":["Leavanny"],"Venipede":["Scolipede","Whirlipede"],"Venipede (Shadow)":["Whirlipede (Shadow)","Scolipede (Shadow)"],"Whirlipede":["Scolipede"],"Whirlipede (Shadow)":["Scolipede (Shadow)"],"Cottonee":["Whimsicott"],"Petilil":["Lilligant"],"Basculin":["Basculegion (Female)","Basculegion (Male)"],"Sandile":["Krookodile","Krokorok"],"Krokorok":["Krookodile"],"Darumaka":["Darmanitan (Standard)"],"Darumaka (Galarian)":["Darmanitan (Galarian)"],"Darumaka (Shadow)":["Darmanitan (Standard) (Shadow)"],"Dwebble":["Crustle"],"Dwebble (Shadow)":["Crustle (Shadow)"],"Scraggy":["Scrafty"],"Yamask":["Cofagrigus"],"Yamask (Galarian)":["Runerigus"],"Yamask (Shadow)":["Cofagrigus (Shadow)"],"Tirtouga":["Carracosta"],"Tirtouga (Shadow)":["Carracosta (Shadow)"],"Archen":["Archeops"],"Archen (Shadow)":["Archeops (Shadow)"],"Trubbish":["Garbodor"],"Trubbish (Shadow)":["Garbodor (Shadow)"],"Zorua":["Zoroark"],"Zorua (Hisuian)":["Zoroark (Hisuian)"],"Minccino":["Cinccino"],"Gothita":["Gothitelle","Gothorita"],"Gothita (Shadow)":["Gothorita (Shadow)","Gothitelle (Shadow)"],"Gothorita":["Gothitelle"],"Gothorita (Shadow)":["Gothitelle (Shadow)"],"Solosis":["Reuniclus","Duosion"],"Solosis (Shadow)":["Reuniclus (Shadow)","Duosion (Shadow)"],"Duosion":["Reuniclus"],"Duosion (Shadow)":["Reuniclus (Shadow)"],"Ducklett":["Swanna"],"Ducklett (Shadow)":["Swanna (Shadow)"],"Vanillite":["Vanilluxe","Vanillish"],"Vanillish":["Vanilluxe"],"Deerling":["Sawsbuck"],"Karrablast":["Escavalier"],"Karrablast (Shadow)":["Escavalier (Shadow)"],"Foongus":["Amoonguss"],"Foongus (Shadow)":["Amoonguss (Shadow)"],"Frillish":["Jellicent"],"Joltik":["Galvantula"],"Joltik (Shadow)":["Galvantula (Shadow)"],"Ferroseed":["Ferrothorn"],"Ferroseed (Shadow)":["Ferrothorn (Shadow)"],"Klink":["Klang","Klinklang"],"Klang":["Klinklang"],"Tynamo":["Eelektrik","Eelektross"],"Eelektrik":["Eelektross"],"Elgyem":["Beheeyem"],"Litwick":["Lampent","Chandelure"],"Litwick (Shadow)":["Lampent (Shadow)","Chandelure (Shadow)"],"Lampent":["Chandelure"],"Lampent (Shadow)":["Chandelure (Shadow)"],"Axew":["Fraxure","Haxorus"],"Fraxure":["Haxorus"],"Cubchoo":["Beartic"],"Shelmet":["Accelgor"],"Shelmet (Shadow)":["Accelgor (Shadow)"],"Mienfoo":["Mienshao"],"Golett":["Golurk"],"Golett (Shadow)":["Golurk (Shadow)"],"Pawniard":["Kingambit","Bisharp"],"Bisharp":["Kingambit"],"Rufflet":["Braviary"],"Vullaby":["Mandibuzz"],"Deino":["Zweilous","Hydreigon"],"Deino (Shadow)":["Zweilous (Shadow)","Hydreigon (Shadow)"],"Zweilous":["Hydreigon"],"Zweilous (Shadow)":["Hydreigon (Shadow)"],"Larvesta":["Volcarona"],"Chespin":["Quilladin","Chesnaught"],"Chespin (Shadow)":["Quilladin (Shadow)","Chesnaught (Shadow)"],"Quilladin":["Chesnaught"],"Quilladin (Shadow)":["Chesnaught (Shadow)"],"Fennekin":["Delphox","Braixen"],"Fennekin (Shadow)":["Braixen (Shadow)","Delphox (Shadow)"],"Braixen":["Delphox"],"Braixen (Shadow)":["Delphox (Shadow)"],"Froakie":["Frogadier","Greninja"],"Froakie (Shadow)":["Frogadier (Shadow)","Greninja (Shadow)"],"Frogadier":["Greninja"],"Frogadier (Shadow)":["Greninja (Shadow)"],"Bunnelby":["Diggersby"],"Bunnelby (Shadow)":["Diggersby (Shadow)"],"Fletchling":["Talonflame","Fletchinder"],"Fletchling (Shadow)":["Fletchinder (Shadow)","Talonflame (Shadow)"],"Fletchinder":["Talonflame"],"Fletchinder (Shadow)":["Talonflame (Shadow)"],"Scatterbug":["Vivillon","Spewpa"],"Spewpa":["Vivillon"],"Litleo":["Pyroar"],"Flabebe":["Florges","Floette"],"Floette":["Florges"],"Skiddo":["Gogoat"],"Pancham":["Pangoro"],"Espurr":["Meowstic (Male)"],"Honedge":["Aegislash (Shield)","Doublade"],"Doublade":["Aegislash (Shield)"],"Spritzee":["Aromatisse"],"Swirlix":["Slurpuff"],"Inkay":["Malamar"],"Inkay (Shadow)":["Malamar (Shadow)"],"Binacle":["Barbaracle"],"Skrelp":["Dragalge"],"Clauncher":["Clawitzer"],"Helioptile":["Heliolisk"],"Helioptile (Shadow)":["Heliolisk (Shadow)"],"Tyrunt":["Tyrantrum"],"Tyrunt (Shadow)":["Tyrantrum (Shadow)"],"Amaura":["Aurorus"],"Amaura (Shadow)":["Aurorus (Shadow)"],"Goomy":["Goodra","Sliggoo"],"Sliggoo":["Goodra"],"Phantump":["Trevenant"],"Phantump (Shadow)":["Trevenant (Shadow)"],"Pumpkaboo (Average)":["Gourgeist (Average)"],"Pumpkaboo (Large)":["Gourgeist (Large)"],"Pumpkaboo (Small)":["Gourgeist (Small)"],"Pumpkaboo (Super)":["Gourgeist (Super)"],"Bergmite":["Avalugg"],"Noibat":["Noivern"],"Rowlet":["Decidueye","Dartrix"],"Dartrix":["Decidueye"],"Litten":["Incineroar","Torracat"],"Torracat":["Incineroar"],"Popplio":["Brionne","Primarina"],"Brionne":["Primarina"],"Pikipek":["Trumbeak","Toucannon"],"Pikipek (Shadow)":["Trumbeak (Shadow)","Toucannon (Shadow)"],"Trumbeak":["Toucannon"],"Trumbeak (Shadow)":["Toucannon (Shadow)"],"Yungoos":["Gumshoos"],"Grubbin":["Charjabug","Vikavolt"],"Grubbin (Shadow)":["Vikavolt (Shadow)","Charjabug (Shadow)"],"Charjabug":["Vikavolt"],"Charjabug (Shadow)":["Vikavolt (Shadow)"],"Crabrawler":["Crabominable"],"Cutiefly":["Ribombee"],"Rockruff":["Lycanroc (Midday)","Lycanroc (Midnight)"],"Mareanie":["Toxapex"],"Mudbray":["Mudsdale"],"Dewpider":["Araquanid"],"Dewpider (Shadow)":["Araquanid (Shadow)"],"Fomantis":["Lurantis"],"Morelull":["Shiinotic"],"Salandit":["Salazzle"],"Stufful":["Bewear"],"Stufful (Shadow)":["Bewear (Shadow)"],"Bounsweet":["Steenee","Tsareena"],"Steenee":["Tsareena"],"Wimpod":["Golisopod"],"Sandygast":["Palossand"],"Type (Null)":["Silvally"],"Jangmo-o":["Hakamo-o","Kommo-o"],"Hakamo-o":["Kommo-o"],"Cosmog":["Solgaleo","Cosmoem","Lunala"],"Cosmoem":["Solgaleo","Lunala"],"Poipole":["Naganadel"],"Meltan":["Melmetal"],"Grookey":["Thwackey","Rillaboom"],"Thwackey":["Rillaboom"],"Scorbunny":["Cinderace","Raboot"],"Raboot":["Cinderace"],"Sobble":["Drizzile","Inteleon"],"Drizzile":["Inteleon"],"Skwovet":["Greedent"],"Rookidee":["Corvisquire","Corviknight"],"Corvisquire":["Corviknight"],"Blipbug":["Dottler","Orbeetle"],"Dottler":["Orbeetle"],"Nickit":["Thievul"],"Gossifleur":["Eldegoss"],"Wooloo":["Dubwool"],"Chewtle":["Drednaw"],"Yamper":["Boltund"],"Rolycoly":["Coalossal","Carkol"],"Carkol":["Coalossal"],"Applin":["Dipplin","Appletun","Flapple","Hydrapple"],"Silicobra":["Sandaconda"],"Arrokuda":["Barraskewda"],"Toxel":["Toxtricity (Low Key)","Toxtricity (Amped)"],"Sizzlipede":["Centiskorch"],"Clobbopus":["Grapploct"],"Sinistea":["Polteageist"],"Hatenna":["Hatterene","Hattrem"],"Hattrem":["Hatterene"],"Impidimp":["Morgrem","Grimmsnarl"],"Morgrem":["Grimmsnarl"],"Milcery":["Alcremie"],"Snom":["Frosmoth"],"Cufant":["Copperajah"],"Duraludon":["Archaludon"],"Dreepy":["Dragapult","Drakloak"],"Drakloak":["Dragapult"],"Kubfu":["Urshifu (Rapid Strike)","Urshifu (Single Strike)"],"Sprigatito":["Meowscarada","Floragato"],"Floragato":["Meowscarada"],"Fuecoco":["Skeledirge","Crocalor"],"Crocalor":["Skeledirge"],"Quaxly":["Quaxwell","Quaquaval"],"Quaxwell":["Quaquaval"],"Lechonk":["Oinkologne"],"Tarountula":["Spidops"],"Nymble":["Lokix"],"Pawmi":["Pawmo","Pawmot"],"Pawmo":["Pawmot"],"Tandemaus":["Maushold"],"Fidough":["Dachsbun"],"Smoliv":["Arboliva","Dolliv"],"Dolliv":["Arboliva"],"Nacli":["Naclstack","Garganacl"],"Naclstack":["Garganacl"],"Charcadet":["Armarouge","Ceruledge"],"Tadbulb":["Bellibolt"],"Wattrel":["Kilowattrel"],"Maschiff":["Mabosstiff"],"Shroodle":["Grafaiai"],"Bramblin":["Brambleghast"],"Toedscool":["Toedscruel"],"Capsakid":["Scovillain"],"Rellor":["Rabsca"],"Flittle":["Espathra"],"Tinkatink":["Tinkatuff","Tinkaton"],"Tinkatuff":["Tinkaton"],"Wiglett":["Wugtrio"],"Finizen":["Palafin"],"Varoom":["Revavroom"],"Glimmet":["Glimmora"],"Greavard":["Houndstone"],"Cetoddle":["Cetitan"],"Frigibax":["Arctibax","Baxcalibur"],"Arctibax":["Baxcalibur"],"Gimmighoul":["Gholdengo"],"Dipplin":["Hydrapple"],"Sinistcha":["Poltchageist"]};
  const TIERS   = ['S', 'A', 'B', 'C', 'D', 'E', 'U'];
  const SELECTABLE_TIERS = ['S', 'A', 'B', 'C', 'D', 'E']; // U (Unrated) not selectable in settings
  const PAGE_SIZE = 60;
  const API_URL   = 'https://mknepprath.github.io/lily-dex-api/pokedex.json';

  /* ================================================================
  /* ================================================================
    STATE
  ================================================================ */
  let allPokemon  = [];
  let dataLoaded  = false;
  let dataLoading = false;
  let userDb      = {};
  let currentId   = null;
  let detailSource = "home"; // "home" or "watchlist"
  let visibleCount = PAGE_SIZE;

  /* ================================================================
    LOCALSTORAGE
  ================================================================ */
  // userDb is now populated from Supabase in initApp()
  // saveUserDb is replaced by specific SB calls per change
  function saveUserDb() {
    // Legacy: no-op — saves now happen via specific SB calls
  }
  function loadUserDb() {
    // Legacy: no-op — data loaded from Supabase in initApp()
  }
  function getUserEntry(id) {
    if (!userDb[id]) {
      const ratings = {};
      FORMATS.forEach(f => ratings[f] = null);
      userDb[id] = { ratings, myRatings: null, communityRatings: null, notes: '', evolveWorthy: false, considerCatch: false, useMyRatings: false };
    }
    // Backfill fields for entries created before this feature
    if (!('useMyRatings' in userDb[id])) userDb[id].useMyRatings = false;
    return userDb[id];
  }

  // Global ratings mode: 'community' or 'mine'
  let globalRatingsMode = 'community';

  // Get the effective ratings for a pokemon (respects global mode + per-pokemon override)
  function getEffectiveRatings(id) {
    const entry = userDb[id];
    const p = allPokemon.find(x => x.id === id);
    // useMyRatings is set on every entry by the global toggle, or overridden per-pokemon
    const useMine = entry?.useMyRatings || false;

    if (useMine) {
      return entry?.myRatings || entry?.ratings || {};
    } else {
      // Community: prefer stored communityRatings, fall back to embedded COMMUNITY_RATINGS
      if (entry?.communityRatings) return entry.communityRatings;
      if (p) {
        const embedded = COMMUNITY_RATINGS[p.name]
          || Object.entries(COMMUNITY_RATINGS).find(([k]) => k.toLowerCase() === p.name.toLowerCase())?.[1];
        if (embedded) return embedded;
      }
      return entry?.ratings || {};
    }
  }
  function loadCustomPokemon() {
    try { return JSON.parse(localStorage.getItem('pogo-custom-v4') || '[]'); }
    catch(e) { return []; }
  }
  function saveCustomPokemon() {
    // Custom pokemon stored locally for now
    try { localStorage.setItem('pogo-custom-v4', JSON.stringify(allPokemon.filter(p => p.isCustom))); } catch(e) {}
  }

  /* ================================================================
    ADMIN UI — update all admin-sensitive elements
  ================================================================ */
  function refreshAdminUI() {
    const loggedIn = Auth.isLoggedIn();

    // Admin bar
    const dot  = document.getElementById('admin-dot');
    const text = document.getElementById('admin-status-text');
    const btn  = document.getElementById('admin-toggle-btn');
    dot.classList.toggle('on', loggedIn);
    text.textContent = loggedIn ? 'Admin' : 'Viewing';
    btn.textContent  = loggedIn ? '🔓 Log out' : '🔒 Admin login';
    btn.classList.toggle('logout', loggedIn);

    // Import button + ratings mode btn — only visible when logged in
    const importBtn = document.getElementById('import-ratings-btn');
    if (importBtn) importBtn.style.display = loggedIn ? '' : 'none';
    const modeBtn = document.getElementById('ratings-mode-btn');
    if (modeBtn) modeBtn.style.display = loggedIn ? '' : 'none';
    const votesBtn = document.getElementById('votes-admin-btn');
    if (votesBtn) votesBtn.style.display = loggedIn ? '' : 'none';

    // Detail page edit section & readonly notice (only matters if detail is open)
    if (currentId) {
      document.getElementById('edit-section').style.display     = loggedIn ? '' : 'none';
      document.getElementById('readonly-notice').style.display  = loggedIn ? 'none' : '';
      // Re-render ratings with correct readonly state
      const entry = getUserEntry(currentId);
      renderRatings(entry);
    }
  }

  /* ================================================================
    LOGIN MODAL
  ================================================================ */
  document.getElementById('admin-toggle-btn').addEventListener('click', () => {
    if (Auth.isLoggedIn()) {
      Auth.logout();
      refreshAdminUI();
    } else {
      document.getElementById('login-input').value = '';
      document.getElementById('login-error').textContent = '';
      document.getElementById('login-overlay').classList.add('open');
      setTimeout(() => document.getElementById('login-input').focus(), 50);
    }
  });

  function attemptLogin() {
    const pw = document.getElementById('login-input').value;
    if (Auth.verify(pw)) {
      document.getElementById('login-overlay').classList.remove('open');
      Auth.login();
      refreshAdminUI();
    } else {
      document.getElementById('login-error').textContent = 'Incorrect password.';
      const inp = document.getElementById('login-input');
      inp.classList.add('shake');
      inp.value = '';
      setTimeout(() => inp.classList.remove('shake'), 400);
    }
  }

  document.getElementById('login-submit').addEventListener('click', attemptLogin);
  document.getElementById('login-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') attemptLogin();
  });
  document.getElementById('login-cancel').addEventListener('click', () => {
    document.getElementById('login-overlay').classList.remove('open');
  });

  /* ================================================================
    FETCH & PARSE
  ================================================================ */
  function parseLilyDex(data) {
    const list = Array.isArray(data) ? data : Object.values(data);
    const seen = new Set();
    return list
      .filter(p => p && p.names && p.dexNr && p.released !== false)
      .filter(p => { if (seen.has(p.formId)) return false; seen.add(p.formId); return true; })
      .map(p => {
        const t1 = p.primaryType?.names?.English?.toLowerCase() || 'normal';
        const t2 = p.secondaryType?.names?.English?.toLowerCase() || null;
        return {
          id: 'api-' + p.formId,
          name: p.names.English,
          dex: p.dexNr,
          types: t2 ? [t1, t2] : [t1],
          spriteUrl: p.pixelSprites?.image || p.assets?.image || null,
          stats: p.stats || null,
          isCustom: false
        };
      })
      .sort((a, b) => a.dex - b.dex || a.name.localeCompare(b.name));
  }

  async function ensureDataLoaded() {
    if (dataLoaded) return true;
    if (dataLoading) return false;
    dataLoading = true;
    showState('loading');
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      allPokemon = [...parseLilyDex(json), ...loadCustomPokemon()].sort((a,b) => a.dex - b.dex);
      dataLoaded = true; dataLoading = false;
      return true;
    } catch(err) {
      dataLoading = false;
      showState('error', `Could not load Pokémon GO data: ${err.message}`);
      return false;
    }
  }

  function showState(state, msg) {
    document.getElementById('idle-state').style.display    = state === 'idle'    ? '' : 'none';
    document.getElementById('loading-state').style.display = state === 'loading' ? '' : 'none';
    document.getElementById('error-state').style.display   = state === 'error'   ? '' : 'none';
    document.getElementById('results-area').style.display  = state === 'results' ? '' : 'none';
    if (state === 'error' && msg) document.getElementById('error-msg').textContent = '⚠️ ' + msg;
  }

  /* ================================================================
    GRID
  ================================================================ */
  // Generation ranges by dex number
  function getDexGen(dex) {
    if (dex <= 151)  return 1;
    if (dex <= 251)  return 2;
    if (dex <= 386)  return 3;
    if (dex <= 493)  return 4;
    if (dex <= 649)  return 5;
    if (dex <= 721)  return 6;
    if (dex <= 809)  return 7;
    if (dex <= 905)  return 8;
    return 9;
  }

  // Active filter state
  let activeFilters = {
    types: new Set(),
    typeAnd: false,         // if true, pokemon must match ALL selected types
    formats: {},            // { formatName: minTier }
    lcMinTier: null,        // min LC tier to show ('S','A','B' or null)
    evoFormatsFilter: {},   // { formatName: minTier } for evolution flag filtering
    gens: new Set(),
    flags: new Set(),
  };

  const TIER_ORDER = ['S','A','B','C','D','E','U',null];

  function hasActiveFilters() {
    return activeFilters.types.size > 0
      || Object.keys(activeFilters.formats).length > 0
      || activeFilters.lcMinTier !== null
      || Object.keys(activeFilters.evoFormatsFilter).length > 0
      || activeFilters.gens.size > 0
      || activeFilters.flags.size > 0;
  }

  function getFiltered() {
    const q = document.getElementById('search-input').value.toLowerCase().trim();
    return allPokemon.filter(p => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || String(p.dex).includes(q);

      // Type filter
      const matchType = activeFilters.types.size === 0
        || (activeFilters.typeAnd
          ? [...activeFilters.types].every(t => p.types.includes(t))
          : p.types.some(t => activeFilters.types.has(t)));

      // Generation filter
      const matchGen = activeFilters.gens.size === 0
        || activeFilters.gens.has(getDexGen(p.dex));

      // Format/tier filter — pokemon must meet ALL selected format minimums
      let matchFormat = true;
      for (const [fmt, minTier] of Object.entries(activeFilters.formats)) {
        const entry = userDb[p.id];
        const pTier = entry?.ratings?.[fmt] || null;
        const pIdx  = TIER_ORDER.indexOf(pTier);
        const mIdx  = TIER_ORDER.indexOf(minTier);
        if (pIdx < 0 || pIdx > mIdx) { matchFormat = false; break; }
      }

      // LC tier filter
      let matchLC = true;
      if (activeFilters.lcMinTier) {
        const TIER_ORDER_LC = ['S','A','B'];
        const lcEntry = Object.entries(LC_RATINGS).find(([k]) =>
          k === p.name || k.toLowerCase() === p.name.toLowerCase()
        );
        const lcTier = lcEntry ? lcEntry[1] : null;
        const lcIdx  = lcTier ? TIER_ORDER_LC.indexOf(lcTier) : -1;
        const minIdx = TIER_ORDER_LC.indexOf(activeFilters.lcMinTier);
        if (lcIdx < 0 || lcIdx > minIdx) matchLC = false;
      }

      // Evo flag filter (per format minimum)
      let matchEvo = true;
      for (const [fmt, minTier] of Object.entries(activeFilters.evoFormatsFilter)) {
        const eff = getEffectiveRatings(p.id);
        const pTier = eff[fmt] || null;
        const pIdx  = TIER_ORDER.indexOf(pTier);
        const mIdx  = TIER_ORDER.indexOf(minTier);
        if (pIdx < 0 || pIdx > mIdx) { matchEvo = false; break; }
      }

      // Flag filter
      let matchFlag = true;
      if (activeFilters.flags.size > 0) {
        const entry = userDb[p.id];
        if (activeFilters.flags.has('evolve')   && !entry?.evolveWorthy)  matchFlag = false;
        if (activeFilters.flags.has('consider') && !entry?.considerCatch) matchFlag = false;
      }

      return matchSearch && matchType && matchGen && matchFormat && matchLC && matchEvo && matchFlag;
    });
  }

  // Abbreviated format names for the pills
  const FORMAT_ABBR = {
    'Raids':        'Raids',
    'Great League': 'GL',
    'Ultra League': 'UL',
    'Master League':'ML',
    'Gym Defense':  'Gyms'
  };

  // Settings state — which tiers/formats to show as pills on cards
  let cardSettings = {
    tiers:   new Set(['S','A']),
    formats: new Set(['Raids','Great League','Ultra League','Master League','Gym Defense']),
    lcNoteTiers: new Set(['S','A']),
    evoTiers:   new Set(['S','A']),    // tiers that trigger the ↑ evolve flag
    evoFormats: new Set(['Raids','Great League','Ultra League','Master League','Gym Defense']), // formats considered for evolve flag
  };

  const TIER_META = {
    S: { label: 'S', desc: 'Meta — Format Defining',      bg: 'var(--tier-s)', color: '#fff' },
    A: { label: 'A', desc: 'Very Strong — Staple Pick',   bg: 'var(--tier-a)', color: '#fff' },
    B: { label: 'B', desc: 'Viable — Solid but not top',  bg: 'var(--tier-b)', color: '#333' },
    C: { label: 'C', desc: 'Mediocre — Situational',      bg: 'var(--tier-c)', color: '#333' },
    D: { label: 'D', desc: 'Barely Usable',               bg: 'var(--tier-d)', color: '#fff' },
    E: { label: 'E', desc: 'Bottom Tier',                 bg: 'var(--tier-e)', color: '#fff' },
    U: { label: 'U', desc: 'Unrated — No data',           bg: 'var(--tier-unrated)', color: '#fff' },
  };

  function renderLegend() {
    const el = document.getElementById('legend');
    if (!el) return;
    const tierItems = TIERS
      .filter(t => cardSettings.tiers.has(t))
      .map(t => {
        const m = TIER_META[t];
        return `<div class="legend-item">
          <div class="legend-swatch" style="background:${m.bg};color:${m.color}">${m.label}</div>
          <span>${m.desc}</span>
        </div>`;
      }).join('');

    // Fixed items always shown
    const fixedItems = `
      <div class="legend-item">
        <div class="legend-swatch" style="background:#e8f2ec;border:1px solid #b8d9c4;color:var(--accent)">↑</div>
        <span>Potentially Relevant Evolution</span>
      </div>
      <div class="legend-item">
        <div class="legend-swatch" style="background:transparent;border:none;font-size:14px;">⚠️</div>
        <span>Other Factors — May Be Worth Catching</span>
      </div>`;

    el.innerHTML = tierItems + fixedItems;
  }


  /* ================================================================
    AUTO EVOLVE FLAG
    Returns true if any descendant of this pokemon has a meaningful
    rating (non-null, non-U) in any format.
  ================================================================ */
  function hasRatedDescendant(pokemonName) {
    const descendants = EVO_ANCESTRY[pokemonName];
    if (!descendants || descendants.length === 0) return false;
    return descendants.some(descName => {
      // Find the pokemon in allPokemon by name
      const desc = allPokemon.find(p => p.name === descName);
      if (!desc) return false;
      const entry = userDb[desc.id];
      if (!entry) return false;
      // Check if any format has a real rating (not null, not U)
      return FORMATS.filter(f => cardSettings.evoFormats.has(f))
        .some(f => { const r = getEffectiveRatings(desc.id)[f]; return r && cardSettings.evoTiers.has(r); });
    });
  }

  /* Call this after loading/importing ratings to auto-set evolveWorthy flags */
  function autoSetEvolveFlags() {
    let changed = 0;
    allPokemon.forEach(p => {
      const shouldFlag = hasRatedDescendant(p.name);
      const entry = userDb[p.id];
      const currentAuto = entry ? entry.autoEvolve : false;
      if (shouldFlag !== currentAuto) {
        const e = getUserEntry(p.id);
        e.autoEvolve = shouldFlag;
        if (!e.manualEvolve) e.evolveWorthy = shouldFlag;
        changed++;
      }
    });
    if (changed > 0) saveUserDb();
    return changed;
  }

  /* Auto-set considerCatch flag for Little Cup relevant pokemon */
  function autoSetLCFlags() {
    let changed = 0;
    allPokemon.forEach(p => {
      const lcEntry = Object.entries(LC_RATINGS).find(([k]) =>
        k === p.name || k.toLowerCase() === p.name.toLowerCase()
      );
      const shouldFlag = lcEntry ? cardSettings.lcNoteTiers.has(lcEntry[1]) : false;
      const entry = userDb[p.id];
      const currentAuto = entry ? entry.autoLC : false;
      if (shouldFlag !== currentAuto) {
        const e = getUserEntry(p.id);
        e.autoLC = shouldFlag;
        // Only set considerCatch if not manually overridden
        if (!e.manualConsider) e.considerCatch = shouldFlag;
        changed++;
      }
    });
    if (changed > 0) saveUserDb();
    return changed;
  }

  /* ================================================================
    EVOLUTION TREE
  ================================================================ */

  // Build reverse map: name -> parent name (who evolves INTO this)
  // EVO_ANCESTRY maps parent -> [children], we need child -> parent
  function buildEvoParentMap() {
    const parentMap = {};
    for (const [parent, children] of Object.entries(EVO_ANCESTRY)) {
      for (const child of children) {
        // Only direct parent (not grandparent) - check if parent also has this child directly
        if (!parentMap[child]) parentMap[child] = parent;
      }
    }
    return parentMap;
  }

  function getEvoRoot(name, parentMap, depth=0) {
    if (depth > 6) return name; // safety
    const parent = parentMap[name];
    if (!parent) return name;
    return getEvoRoot(parent, parentMap, depth+1);
  }

  function buildEvoChain(name, depth=0) {
    // Returns nested structure: { name, children: [...] }
    if (depth > 6) return { name, children: [] };
    const children = (EVO_ANCESTRY[name] || []).filter(c => {
      // Only direct children (not grandchildren)
      // A child is direct if no other child of name is also its ancestor
      const siblings = EVO_ANCESTRY[name] || [];
      return !siblings.some(s => s !== c && (EVO_ANCESTRY[s] || []).includes(c));
    });
    return {
      name,
      children: children.map(c => buildEvoChain(c, depth+1))
    };
  }

  function renderEvoNode(nodeName, currentName) {
    const p = allPokemon.find(x => x.name === nodeName);
    const isCurrent = nodeName === currentName;
    const spriteHtml = p?.spriteUrl
      ? `<img src="${p.spriteUrl}" alt="${nodeName}">`
      : `<div class="evo-placeholder">🔵</div>`;
    // Show top tier pills
    const pills = p ? FORMATS.map(f => {
      const tier = userDb[p.id]?.ratings?.[f];
      if (!tier || tier === 'U' || !cardSettings.tiers.has(tier)) return '';
      const TIER_BG = {S:'var(--tier-s)',A:'var(--tier-a)',B:'var(--tier-b)',C:'var(--tier-c)',D:'var(--tier-d)',E:'var(--tier-e)'};
      return `<span class="evo-pill" style="background:${TIER_BG[tier]}">${FORMAT_ABBR[f]} ${tier}</span>`;
    }).join('') : '';
    const dataId = p ? `data-id="${p.id}"` : '';
    return `<div class="evo-node${isCurrent?' current':''}" ${dataId}>
      ${spriteHtml}
      <div class="evo-name">${nodeName}</div>
      ${pills ? `<div class="evo-tier-pills">${pills}</div>` : ''}
    </div>`;
  }

  function renderEvoChainHtml(node, currentName) {
    if (node.children.length === 0) {
      return renderEvoNode(node.name, currentName);
    }
    if (node.children.length === 1) {
      // Linear chain
      return `${renderEvoNode(node.name, currentName)}
        <div class="evo-arrow">→</div>
        ${renderEvoChainHtml(node.children[0], currentName)}`;
    }
    // Branching evolutions
    const branchHtml = node.children.map(c =>
      `<div style="display:flex;align-items:center;gap:6px;">${renderEvoChainHtml(c, currentName)}</div>`
    ).join('<div style="height:4px;"></div>');
    return `${renderEvoNode(node.name, currentName)}
      <div class="evo-arrow">→</div>
      <div class="evo-branch">${branchHtml}</div>`;
  }

  function renderEvoTree(pokemonName) {
    const container = document.getElementById('evo-tree-container');
    if (!container) return;
    const parentMap = buildEvoParentMap();
    const root = getEvoRoot(pokemonName, parentMap);
    // Only show tree if there are evolutions
    if (!EVO_ANCESTRY[root] && root === pokemonName) {
      container.innerHTML = '';
      return;
    }
    const chain = buildEvoChain(root);
    container.innerHTML = `<div class="evo-tree">
      <div class="evo-tree-title">Evolution Chain</div>
      <div class="evo-chain">${renderEvoChainHtml(chain, pokemonName)}</div>
    </div>`;
    // Make evo nodes clickable
    container.querySelectorAll('.evo-node[data-id]').forEach(node => {
      node.addEventListener('click', () => {
        if (node.dataset.id !== currentId) openDetail(node.dataset.id, detailSource);
      });
    });
  }

  function loadCardSettings() {
    try {
      const s = JSON.parse(localStorage.getItem('pogo-card-settings-v1') || 'null');
      if (s) {
        cardSettings.tiers   = new Set(s.tiers   || ['S','A']);
        cardSettings.formats = new Set(s.formats || FORMATS);
        cardSettings.lcNoteTiers = new Set(s.lcNoteTiers || ['S','A']);
        cardSettings.evoTiers   = new Set(s.evoTiers   || ['S','A']);
        cardSettings.evoFormats = new Set(s.evoFormats || FORMATS);
      }
    } catch(e) {}
  }
  function saveCardSettings() {
    try { localStorage.setItem('pogo-card-settings-v1', JSON.stringify({
      tiers:   [...cardSettings.tiers],
      formats: [...cardSettings.formats],
      lcNoteTiers: [...cardSettings.lcNoteTiers],
      evoTiers:    [...cardSettings.evoTiers],
      evoFormats:  [...cardSettings.evoFormats],
    })); } catch(e) {}
  }

  function getHighFormats(id) {
    const effective = getEffectiveRatings(id);
    return FORMATS
      .map(f => ({ fmt: f, tier: effective[f] || null }))
      .filter(x => x.tier && cardSettings.tiers.has(x.tier) && cardSettings.formats.has(x.fmt));
  }

  function renderResults() {
    const filtered = getFiltered();
    const grid = document.getElementById('pokemon-grid');
    const label = document.getElementById('results-label');
    const loadMoreBtn = document.getElementById('load-more-btn');
    showState('results');

    label.textContent = `${filtered.length.toLocaleString()} of ${allPokemon.length.toLocaleString()} Pokémon`;

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results">No Pokémon found.</div>`;
      loadMoreBtn.style.display = 'none';
      return;
    }

    const visible = filtered.slice(0, visibleCount);
    grid.innerHTML = visible.map(p => {
      const highFmts = getHighFormats(p.id);
      const pillsHtml = `<div class="card-format-pills">${highFmts.map(x =>
          `<span class="card-format-pill tier-${x.tier}">${FORMAT_ABBR[x.fmt]} ${x.tier}</span>`
        ).join('')}</div>`;
      const evolveEntry = userDb[p.id];
      const evolveArrow = evolveEntry?.evolveWorthy
        ? `<div class="card-evolve-arrow" title="Potentially Relevant Evolution">↑</div>`
        : '';
      const considerBadge = evolveEntry?.considerCatch
        ? `<div class="card-consider-badge" title="Other Factors — May Be Worth Catching">⚠️</div>`
        : '';
      const spriteEl = p.spriteUrl
        ? `<img class="sprite" src="${p.spriteUrl}" alt="${p.name}" loading="lazy">`
        : `<div class="sprite-placeholder">🔵</div>`;
      const isWatching = watchlist.has(p.id);
      return `<div class="pokemon-card" data-id="${p.id}">
        ${evolveArrow}${considerBadge}
        <button class="card-watch-btn${isWatching?' watching':''}" data-id="${p.id}" title="${isWatching?'Remove from watchlist':'Add to watchlist'}">${isWatching?'★':'☆'}</button>
        ${spriteEl}
        <div class="dex-num">#${String(p.dex).padStart(4,'0')}</div>
        <div class="poke-name">${p.name}</div>
        ${pillsHtml}
      </div>`;
    }).join('');

    grid.querySelectorAll('.pokemon-card').forEach(card => {
      card.addEventListener('click', () => openDetail(card.dataset.id));
    });
    grid.querySelectorAll('.card-watch-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (watchlist.has(id)) {
          watchlist.delete(id);
          btn.textContent='☆'; btn.classList.remove('watching'); btn.title='Add to watchlist';
          if (SB.session) SB.removeFromWatchlist(id);
        } else {
          watchlist.add(id);
          btn.textContent='★'; btn.classList.add('watching'); btn.title='Remove from watchlist';
          if (SB.session) SB.addToWatchlist(id);
        }
        saveWatchlist();
      });
    });

    if (filtered.length > visibleCount) {
      loadMoreBtn.style.display = 'block';
      loadMoreBtn.textContent = `Show more (${(filtered.length - visibleCount).toLocaleString()} remaining)`;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  /* ================================================================
    SEARCH
  ================================================================ */
  let searchDebounce;
  document.getElementById('search-input').addEventListener('input', async (e) => {
    clearTimeout(searchDebounce);
    const q = e.target.value.trim();
    if (!q) { if (dataLoaded) renderResults(); return; }
    if (!dataLoaded) {
      searchDebounce = setTimeout(async () => { if (await ensureDataLoaded()) renderResults(); }, 300);
    } else {
      searchDebounce = setTimeout(() => { visibleCount = PAGE_SIZE; renderResults(); }, 150);
    }
  });

  document.getElementById('load-more-btn').addEventListener('click', () => { visibleCount += PAGE_SIZE; renderResults(); });

  /* ================================================================
    DETAIL PAGE
  ================================================================ */
  function openDetail(id, source) {
    try {
    detailSource = source || "home";
    currentId = id;
    const p = allPokemon.find(x => x.id === id);
    if (!p) { console.warn('openDetail: pokemon not found for id', id); return; }
    const entry = getUserEntry(id);
    const loggedIn = Auth.isLoggedIn();

    // Close any open overlay panels first
    document.getElementById('filter-panel').style.display   = 'none';

    document.getElementById('home-view').classList.remove('active');
    document.getElementById('detail-view').classList.add('active');
    document.getElementById('d-name').textContent = p.name;
    document.getElementById('d-dex').textContent  = `#${String(p.dex).padStart(4,'0')}`;
    document.getElementById('d-types').innerHTML  = p.types.map(t =>
      `<span class="type-badge type-${t}">${t}</span>`
    ).join('');

    const spriteWrap = document.getElementById('d-sprite-wrap');
    spriteWrap.innerHTML = p.spriteUrl
      ? `<img class="detail-sprite" src="${p.spriteUrl}" alt="${p.name}">`
      : `<div class="detail-sprite-placeholder">🔵</div>`;

    // Show/hide edit controls
    document.getElementById('edit-section').style.display    = loggedIn ? '' : 'none';
    document.getElementById('readonly-notice').style.display = loggedIn ? 'none' : '';
    document.getElementById('delete-btn').style.display = (loggedIn && p.isCustom) ? '' : 'none';

    renderRatings(entry);
    renderEvoTree(p.name);
    renderNotes(entry);
    document.getElementById('notes-editor').value = entry.notes || '';
    document.getElementById('evolve-checkbox').checked = entry.evolveWorthy || false;
    document.getElementById('consider-checkbox').checked = entry.considerCatch || false;
    updateWatchlistStar(id);
    if (Auth.isLoggedIn()) updateRatingsSrcBtn(getUserEntry(id));
    document.getElementById('back-btn').textContent = detailSource === 'watchlist' ? '← Watchlist' : '← All Pokémon';
    window.scrollTo(0, 0);
    } catch(err) {
      console.error('openDetail error:', err);
      alert('Error opening Pokémon detail: ' + err.message + '\n\nPlease open the browser console (F12) for details.');
    }
  }

  // Formats where IVs are always 15/15/15
  const PERFECT_IV_FORMATS = new Set(['Raids', 'Gym Defense', 'Master League']);

  // PvPIVs base URL for league IV rankings
  const PVPIVS_URLS = {
    'Great League':  'https://pvpivs.com/?league=great',
    'Ultra League':  'https://pvpivs.com/?league=ultra',
    'Master League': 'https://pvpivs.com/?league=master',
  };

  function renderRatings(entry) {
    const loggedIn  = Auth.isLoggedIn();
    const container = document.getElementById('ratings-container');
    // Track which rows have IV panel open
    const openIVs = new Set(
      [...container.querySelectorAll('.iv-panel[data-open="true"]')]
        .map(el => el.dataset.fmt)
    );

    container.innerHTML = FORMATS.map(fmt => {
      const effectiveRatings = getEffectiveRatings(currentId) || entry.ratings;
      const current = effectiveRatings[fmt] || 'U';
      const buttons = TIERS.map(t => {
        const isActive = current === t;
        const roClass  = loggedIn ? '' : ' readonly';
        return `<button class="tier-btn${isActive ? ' active' : ''}${roClass}" data-fmt="${fmt}" data-tier="${t}">${t}</button>`;
      }).join('');

      const isPerfect = PERFECT_IV_FORMATS.has(fmt);
      const pvpUrl    = PVPIVS_URLS[fmt];
      const panelOpen = openIVs.has(fmt);

      const ivPanel = `<div class="iv-panel" data-fmt="${fmt}" data-open="${panelOpen}" style="display:${panelOpen?'block':'none'};">
        ${isPerfect
          ? `<div class="iv-perfect">✨ Ideal IVs: <strong>15 / 15 / 15</strong> (Attack / Defense / HP)</div>`
          : `<div class="iv-league">
               <div class="iv-note">IVs for ${fmt} depend on the specific Pokémon.<br>Check PvPIVs for the best spreads:</div>
               <a class="iv-link" href="${pvpUrl}" target="_blank" rel="noopener">🔗 Best IVs on PvPIVs →</a>
             </div>`
        }
      </div>`;

      return `<div class="tier-row">
        <div class="tier-format-wrap">
          <div class="tier-format">${fmt}</div>
          <button class="iv-toggle-btn" data-fmt="${fmt}" title="Show ideal IVs">IVs</button>
        </div>
        <div class="tier-buttons">${buttons}</div>
        ${ivPanel}
      </div>`;
    }).join('');

    // IV toggle buttons
    container.querySelectorAll('.iv-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fmt   = btn.dataset.fmt;
        const panel = container.querySelector(`.iv-panel[data-fmt="${fmt}"]`);
        const open  = panel.dataset.open === 'true';
        panel.dataset.open = !open;
        panel.style.display = open ? 'none' : 'block';
        btn.classList.toggle('iv-open', !open);
      });
    });

    if (loggedIn) {
      container.querySelectorAll('.tier-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const entry = getUserEntry(currentId);
          const fmt   = btn.dataset.fmt;
          const tier  = btn.dataset.tier;
          // Get the currently displayed value to determine toggle-off
          const effective = getEffectiveRatings(currentId);
          const currentVal = effective[fmt] || null;
          const newTier = (currentVal === tier && tier !== 'U') ? null : (tier === 'U' ? null : tier);
          // Always write to myRatings when editing manually
          if (!entry.myRatings) {
            // Seed myRatings from current effective ratings so other formats keep their values
            const effective = getEffectiveRatings(currentId);
            entry.myRatings = Object.assign({}, effective);
          }
          entry.myRatings[fmt] = newTier;
          entry.ratings[fmt] = newTier;
          entry.useMyRatings = true;
          saveUserDb();
          updateRatingsSrcBtn(entry);
          renderRatings(entry);
          // Save to Supabase
          SB.setAdminRating(currentId, fmt, newTier || 'U').catch(e => console.error('Rating save:', e));
        });
      });
    }
  }

  function renderNotes(entry) {
    const box = document.getElementById('d-notes');
    if (!box) return;
    // Check if this pokemon has a LC rating worth noting
    const p = allPokemon.find(x => x.id === currentId);
    let lcNote = '';
    if (p) {
      const lcEntry = Object.entries(LC_RATINGS).find(([k]) =>
        k === p.name || k.toLowerCase() === p.name.toLowerCase()
      );
      if (lcEntry && cardSettings.lcNoteTiers.has(lcEntry[1])) {
        const lcRank = Object.keys(LC_RATINGS).indexOf(lcEntry[0]) + 1;
        lcNote = `<div class="lc-note">🏆 Little Cup: <strong>${lcEntry[1]} Tier</strong> (#${lcRank} overall) — May have potential use in Little Cup.</div>`;
      }
    }
    if (entry.notes) {
      box.classList.remove('notes-empty');
      box.innerHTML = lcNote + `<div>${entry.notes.replace(/\n/g, '<br>')}</div>`;
    } else {
      box.classList.toggle('notes-empty', !lcNote);
      box.innerHTML = lcNote || '<span style="color:var(--text-tertiary);font-style:italic;">No notes yet.</span>';
    }
  }

  document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('detail-view').classList.remove('active');
    if (detailSource === 'watchlist') {
      document.getElementById('watchlist-view').style.display = 'block';
      renderWatchlistView();
    } else {
      document.getElementById('home-view').classList.add('active');
      if (dataLoaded) renderResults();
    }
  });

  document.getElementById('save-notes-btn').addEventListener('click', () => {
    if (!Auth.isLoggedIn()) return;
    const entry = getUserEntry(currentId);
    entry.notes = document.getElementById('notes-editor').value;
    saveUserDb();
    renderNotes(entry);
  });

  document.getElementById('evolve-checkbox').addEventListener('change', () => {
    if (!Auth.isLoggedIn()) return;
    const entry = getUserEntry(currentId);
    entry.evolveWorthy = document.getElementById('evolve-checkbox').checked;
    entry.manualEvolve = true;
    saveUserDb();
    SB.setFlag(currentId, { evolve_worthy: entry.evolveWorthy, manual_evolve: true }).catch(console.error);
  });

  document.getElementById('consider-checkbox').addEventListener('change', () => {
    if (!Auth.isLoggedIn()) return;
    const entry = getUserEntry(currentId);
    entry.considerCatch = document.getElementById('consider-checkbox').checked;
    entry.manualConsider = true;
    saveUserDb();
    renderResults();
    SB.setFlag(currentId, { consider_catch: entry.considerCatch, manual_consider: true }).catch(console.error);
  });

  document.getElementById('delete-btn').addEventListener('click', () => {
    if (!Auth.isLoggedIn()) return;
    const p = allPokemon.find(x => x.id === currentId);
    if (!p) return;
    if (!confirm(p.isCustom ? `Remove ${p.name}?` : `Clear all ratings and notes for ${p.name}?`)) return;
    if (p.isCustom) { allPokemon = allPokemon.filter(x => x.id !== currentId); saveCustomPokemon(); }
    else { delete userDb[currentId]; saveUserDb(); }
    document.getElementById('detail-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
  });

  /* ================================================================

  /* ================================================================
    INIT
  ================================================================ */

function showImportBtn() {
    const btn = document.getElementById('import-ratings-btn');
    if (btn) btn.style.display = '';
  }
  function hideImportBtn() {
    const btn = document.getElementById('import-ratings-btn');
    if (btn) btn.style.display = 'none';
  }

  document.getElementById('import-ratings-btn').addEventListener('click', async () => {
    if (!Auth.isLoggedIn()) return;
    const count = Object.keys(COMMUNITY_RATINGS).length;
    if (!confirm(`This will apply community tier ratings (PvPoke + GO Hub) to ${count} Pokémon.\n\nYour existing ratings will be overwritten. Continue?`)) return;

    let applied = 0;
    const ratingsToUpload = [];
    for (const [name, ratings] of Object.entries(COMMUNITY_RATINGS)) {
      const pokemon = allPokemon.find(p => p.name.toLowerCase() === name.toLowerCase());
      if (!pokemon) continue;
      const entry = getUserEntry(pokemon.id);
      if (!entry.communityRatings) entry.communityRatings = {};
      for (const [format, tier] of Object.entries(ratings)) {
        entry.communityRatings[format] = tier;
        if (!entry.useMyRatings) entry.ratings[format] = tier;
        ratingsToUpload.push({ pokemon_id: pokemon.id, pokemon_name: pokemon.name, format, tier });
      }
      applied++;
    }
    // Upload to Supabase
    try {
      await SB.importRatings(ratingsToUpload);
    } catch(e) { console.error('Import ratings upload:', e); }
    autoSetEvolveFlags(); autoSetLCFlags();
    renderResults();
    renderLegend();
    alert(`✅ Applied community ratings to ${applied} Pokémon!\n\nSource: PvPoke (PvP leagues) + GO Hub DB / Dittobase (Raids) + GO Hub DB (Gym Defense)`);
  });

  /* ================================================================
    RATINGS MODE — global toggle + per-pokemon override
  ================================================================ */
  function updateRatingsSrcBtn(entry) {
    const btn = document.getElementById('ratings-src-btn');
    if (!btn) return;
    const useMine = entry ? entry.useMyRatings : false;
    btn.textContent = useMine ? 'Using: My Ratings' : 'Using: Community';
    btn.classList.toggle('using-mine', useMine);
  }

  function updateGlobalModeBtn() {
    const btn = document.getElementById('ratings-mode-btn');
    if (!btn) return;
    btn.textContent = `📊 Using: ${globalRatingsMode === 'mine' ? 'My Ratings' : 'Community'}`;
    btn.classList.toggle('using-mine', globalRatingsMode === 'mine');
  }

  document.getElementById('ratings-mode-btn').addEventListener('click', () => {
    if (!Auth.isLoggedIn()) return;
    globalRatingsMode = globalRatingsMode === 'community' ? 'mine' : 'community';
    // Global toggle overrides ALL per-pokemon settings
    allPokemon.forEach(p => {
      const entry = userDb[p.id];
      if (!entry) return;
      entry.useMyRatings = (globalRatingsMode === 'mine');
    });
    saveUserDb();
    updateGlobalModeBtn();
    autoSetEvolveFlags(); autoSetLCFlags();
    renderResults();
    // If detail is open, re-render it
    if (document.getElementById('detail-view').classList.contains('active') && currentId) {
      const entry = getUserEntry(currentId);
      updateRatingsSrcBtn(entry);
      renderRatings(entry);
    }
  });

  document.getElementById('ratings-src-btn').addEventListener('click', () => {
    if (!Auth.isLoggedIn()) return;
    const entry = getUserEntry(currentId);
    entry.useMyRatings = !entry.useMyRatings;
    const effective = getEffectiveRatings(currentId);
    console.log('Toggle clicked. useMyRatings now:', entry.useMyRatings);
    console.log('myRatings:', entry.myRatings);
    console.log('communityRatings:', entry.communityRatings);
    console.log('effective:', effective);
    const p = allPokemon.find(x => x.id === currentId);
    console.log('COMMUNITY_RATINGS entry:', p ? COMMUNITY_RATINGS[p.name] : 'no match');
    saveUserDb();
    updateRatingsSrcBtn(entry);
    renderRatings(entry);
    autoSetEvolveFlags(); autoSetLCFlags();
  });

  /* ================================================================
    WATCHLIST
  ================================================================ */
  function loadWatchlist() {
    try { return new Set(JSON.parse(localStorage.getItem('pogo-watchlist-v1') || '[]')); }
    catch(e) { return new Set(); }
  }
  function saveWatchlist() {
    try { localStorage.setItem('pogo-watchlist-v1', JSON.stringify([...watchlist])); } catch(e) {}
  }
  let watchlist = loadWatchlist();

  // Sync watchlist with Supabase if logged in
  async function syncWatchlist() {
    if (!SB.isAdmin() && !SB.session) return;
    const cloudList = await SB.loadUserWatchlist();
    // Merge local + cloud
    for (const id of cloudList) watchlist.add(id);
    saveWatchlist();
  }

  function updateWatchlistStar(id) {
    const btn = document.getElementById('watchlist-star-btn');
    if (!btn) return;
    const watching = watchlist.has(id);
    btn.textContent = watching ? '★ Watching' : '☆ Watchlist';
    btn.classList.toggle('watching', watching);
  }

  document.getElementById('watchlist-star-btn').addEventListener('click', async () => {
    if (!currentId) return;
    if (watchlist.has(currentId)) {
      watchlist.delete(currentId);
      if (SB.session) await SB.removeFromWatchlist(currentId);
    } else {
      watchlist.add(currentId);
      if (SB.session) await SB.addToWatchlist(currentId);
    }
    saveWatchlist();
    updateWatchlistStar(currentId);
  });

  document.getElementById('watchlist-btn').addEventListener('click', () => {
    renderWatchlistView();
    document.getElementById('watchlist-view').style.display = 'block';
    window.scrollTo(0, 0);
  });

  document.getElementById('watchlist-search').addEventListener('input', () => {
    renderWatchlistView();
  });

  document.getElementById('watchlist-back-btn').addEventListener('click', () => {
    document.getElementById('watchlist-view').style.display = 'none';
    document.getElementById('home-view').classList.add('active');
    if (dataLoaded) renderResults();
  });

  function renderWatchlistView() {
    const grid = document.getElementById('watchlist-grid');
    const empty = document.getElementById('watchlist-empty');
    const searchEl = document.getElementById('watchlist-search');
    const q = searchEl ? searchEl.value.toLowerCase().trim() : '';
    const watched = allPokemon.filter(p => watchlist.has(p.id) &&
      (!q || p.name.toLowerCase().includes(q) || String(p.dex).includes(q)));
    if (watched.length === 0) {
      grid.innerHTML = '';
      empty.style.display = '';
      return;
    }
    empty.style.display = 'none';
    grid.innerHTML = watched.map(p => {
      const highFmts = getHighFormats(p.id);
      const pillsHtml = highFmts.length
        ? `<div class="card-format-pills">${highFmts.map(x =>
            `<span class="card-format-pill tier-${x.tier}">${FORMAT_ABBR[x.fmt]} ${x.tier}</span>`
          ).join('')}</div>`
        : '';
      const spriteEl = p.spriteUrl
        ? `<img class="sprite" src="${p.spriteUrl}" alt="${p.name}" loading="lazy">`
        : `<div class="sprite-placeholder">🔵</div>`;
      return `<div class="pokemon-card" data-id="${p.id}">
        ${spriteEl}
        <div class="dex-num">#${String(p.dex).padStart(4,'0')}</div>
        <div class="poke-name">${p.name}</div>
        ${pillsHtml}
      </div>`;
    }).join('');
    grid.querySelectorAll('.pokemon-card').forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('watchlist-view').style.display = 'none';
        document.getElementById('detail-view').classList.add('active');
        openDetail(card.dataset.id, 'watchlist');
      });
    });
  }

  /* ================================================================
    SETTINGS PANEL
  ================================================================ */
  loadCardSettings();

  function buildSettingsPanel() {
    const tierWrap = document.getElementById('settings-tier-checks');
    const fmtWrap  = document.getElementById('settings-fmt-checks');
    const TIER_COLORS = {S:'var(--tier-s)',A:'var(--tier-a)',B:'var(--tier-b)',C:'var(--tier-c)',D:'var(--tier-d)',E:'var(--tier-e)'};

    tierWrap.innerHTML = SELECTABLE_TIERS.map(t => {
      const active = cardSettings.tiers.has(t);
      return `<span class="settings-tier-chip${active?' active':''}" data-tier="${t}" style="${active?'':'border-color:'+TIER_COLORS[t]+';color:'+TIER_COLORS[t]}">${t}</span>`;
    }).join('');

    fmtWrap.innerHTML = FORMATS.map(f => {
      const active = cardSettings.formats.has(f);
      return `<span class="settings-tier-chip${active?' active':''}" data-fmt="${f}">${FORMAT_ABBR[f]||f}</span>`;
    }).join('');

    tierWrap.querySelectorAll('.settings-tier-chip[data-tier]').forEach(chip => {
      chip.addEventListener('click', () => {
        const t = chip.dataset.tier;
        if (cardSettings.tiers.has(t)) cardSettings.tiers.delete(t);
        else cardSettings.tiers.add(t);
        saveCardSettings(); buildSettingsPanel();
      });
    });
    const lcWrap = document.getElementById('settings-lc-checks');
    if (lcWrap) {
      lcWrap.innerHTML = ['S','A','B'].map(t => {
        const active = cardSettings.lcNoteTiers.has(t);
        return `<span class="settings-tier-chip${active?' active':''}" data-lctier="${t}" style="${active?'':'border-color:'+TIER_COLORS[t]+';color:'+TIER_COLORS[t]}">${t}</span>`;
      }).join('');
      lcWrap.querySelectorAll('[data-lctier]').forEach(chip => {
        chip.addEventListener('click', () => {
          const t = chip.dataset.lctier;
          if (cardSettings.lcNoteTiers.has(t)) cardSettings.lcNoteTiers.delete(t);
          else cardSettings.lcNoteTiers.add(t);
          saveCardSettings();
          buildSettingsPanel();
          autoSetLCFlags();
          if (currentId) renderNotes(getUserEntry(currentId));
        });
      });
    }

    const evoTierWrap = document.getElementById('settings-evo-tier-checks');
    const evoFmtWrap  = document.getElementById('settings-evo-fmt-checks');
    if (evoTierWrap) {
      evoTierWrap.innerHTML = SELECTABLE_TIERS.map(t => {
        const active = cardSettings.evoTiers.has(t);
        return `<span class="settings-tier-chip${active?' active':''}" data-evotier="${t}" style="${active?'':'border-color:'+TIER_COLORS[t]+';color:'+TIER_COLORS[t]}">${t}</span>`;
      }).join('');
      evoTierWrap.querySelectorAll('[data-evotier]').forEach(chip => {
        chip.addEventListener('click', () => {
          const t = chip.dataset.evotier;
          if (cardSettings.evoTiers.has(t)) cardSettings.evoTiers.delete(t);
          else cardSettings.evoTiers.add(t);
          saveCardSettings(); autoSetEvolveFlags(); autoSetLCFlags(); renderResults(); buildSettingsPanel();
        });
      });
    }
    if (evoFmtWrap) {
      evoFmtWrap.innerHTML = FORMATS.map(f => {
        const active = cardSettings.evoFormats.has(f);
        return `<span class="settings-tier-chip${active?' active':''}" data-evofmt="${f}">${FORMAT_ABBR[f]||f}</span>`;
      }).join('');
      evoFmtWrap.querySelectorAll('[data-evofmt]').forEach(chip => {
        chip.addEventListener('click', () => {
          const f = chip.dataset.evofmt;
          if (cardSettings.evoFormats.has(f)) cardSettings.evoFormats.delete(f);
          else cardSettings.evoFormats.add(f);
          saveCardSettings(); autoSetEvolveFlags(); autoSetLCFlags(); renderResults(); buildSettingsPanel();
        });
      });
    }

    fmtWrap.querySelectorAll('.settings-tier-chip[data-fmt]').forEach(chip => {
      chip.addEventListener('click', () => {
        const f = chip.dataset.fmt;
        if (cardSettings.formats.has(f)) cardSettings.formats.delete(f);
        else cardSettings.formats.add(f);
        saveCardSettings(); buildSettingsPanel();
      });
    });
  }

  /* ================================================================
    FILTER PANEL
  ================================================================ */
  const ALL_TYPES = ['normal','fire','water','grass','electric','ice','fighting','poison',
    'ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
  const GEN_LABELS = {1:'Gen 1',2:'Gen 2',3:'Gen 3',4:'Gen 4',5:'Gen 5',6:'Gen 6',7:'Gen 7',8:'Gen 8',9:'Gen 9'};

  function buildFilterPanel() {
    const TIER_OPTS = SELECTABLE_TIERS;

    // Format & Minimum Tier
    const fmtWrap = document.getElementById('filter-formats');
    fmtWrap.innerHTML = FORMATS.map(f => {
      const cur = activeFilters.formats[f] || '';
      return `<div class="filter-fmt-row">
        <span class="filter-fmt-name">${f}</span>
        <select class="filter-tier-sel" data-ffmt="${f}">
          <option value="">Any</option>
          ${TIER_OPTS.map(t => `<option value="${t}"${cur===t?' selected':''}>${t} or better</option>`).join('')}
        </select>
      </div>`;
    }).join('');
    fmtWrap.querySelectorAll('[data-ffmt]').forEach(sel => {
      sel.addEventListener('change', () => {
        if (sel.value) activeFilters.formats[sel.dataset.ffmt] = sel.value;
        else delete activeFilters.formats[sel.dataset.ffmt];
        updateFilterBtn();
      });
    });

    // Little Cup
    const lcWrap = document.getElementById('filter-lc');
    const lcCur = activeFilters.lcMinTier || '';
    lcWrap.innerHTML = `<div class="filter-fmt-row">
      <span class="filter-fmt-name">Little Cup</span>
      <select class="filter-tier-sel" id="filter-lc-sel">
        <option value="">Any</option>
        ${['S','A','B'].map(t => `<option value="${t}"${lcCur===t?' selected':''}>${t} or better</option>`).join('')}
      </select>
    </div>`;
    document.getElementById('filter-lc-sel').addEventListener('change', e => {
      activeFilters.lcMinTier = e.target.value || null;
      updateFilterBtn();
    });

    // Evolution flag per format
    const evoWrap = document.getElementById('filter-evo-fmt-rows');
    evoWrap.innerHTML = FORMATS.map(f => {
      const cur = activeFilters.evoFormatsFilter[f] || '';
      return `<div class="filter-fmt-row">
        <span class="filter-fmt-name">${f}</span>
        <select class="filter-tier-sel" data-evofmt="${f}">
          <option value="">Any</option>
          ${TIER_OPTS.map(t => `<option value="${t}"${cur===t?' selected':''}>${t} or better</option>`).join('')}
        </select>
      </div>`;
    }).join('');
    evoWrap.querySelectorAll('[data-evofmt]').forEach(sel => {
      sel.addEventListener('change', () => {
        if (sel.value) activeFilters.evoFormatsFilter[sel.dataset.evofmt] = sel.value;
        else delete activeFilters.evoFormatsFilter[sel.dataset.evofmt];
        updateFilterBtn();
      });
    });

    // Flags
    const flagWrap = document.getElementById('filter-flags');
    flagWrap.innerHTML = [
      { key:'evolve',  label:'↑ Potentially Relevant Evolution' },
      { key:'consider',label:'⚠️ Other Factors — May Be Worth Catching' },
    ].map(({key,label}) => {
      const active = activeFilters.flags.has(key);
      return `<span class="filter-chip${active?' active':''}" data-fflag="${key}">${label}</span>`;
    }).join('');
    flagWrap.querySelectorAll('[data-fflag]').forEach(chip => {
      chip.addEventListener('click', () => {
        const k = chip.dataset.fflag;
        if (activeFilters.flags.has(k)) activeFilters.flags.delete(k);
        else activeFilters.flags.add(k);
        chip.classList.toggle('active', activeFilters.flags.has(k));
        updateFilterBtn();
      });
    });

    // Types with AND toggle
    const typeAndChk = document.getElementById('filter-type-and');
    if (typeAndChk) {
      typeAndChk.checked = activeFilters.typeAnd;
      typeAndChk.addEventListener('change', () => {
        activeFilters.typeAnd = typeAndChk.checked;
        updateFilterBtn();
      });
    }
    const typeWrap = document.getElementById('filter-types');
    typeWrap.innerHTML = ALL_TYPES.map(t => {
      const active = activeFilters.types.has(t);
      return `<span class="filter-chip${active?' active':''}" data-ftype="${t}" style="text-transform:capitalize">${t}</span>`;
    }).join('');
    typeWrap.querySelectorAll('[data-ftype]').forEach(chip => {
      chip.addEventListener('click', () => {
        const t = chip.dataset.ftype;
        if (activeFilters.types.has(t)) activeFilters.types.delete(t);
        else activeFilters.types.add(t);
        chip.classList.toggle('active', activeFilters.types.has(t));
        updateFilterBtn();
      });
    });

    // Generations
    const genWrap = document.getElementById('filter-gens');
    genWrap.innerHTML = Object.entries(GEN_LABELS).map(([g,label]) => {
      const active = activeFilters.gens.has(Number(g));
      return `<span class="filter-chip${active?' active':''}" data-fgen="${g}">${label}</span>`;
    }).join('');
    genWrap.querySelectorAll('[data-fgen]').forEach(chip => {
      chip.addEventListener('click', () => {
        const g = Number(chip.dataset.fgen);
        if (activeFilters.gens.has(g)) activeFilters.gens.delete(g);
        else activeFilters.gens.add(g);
        chip.classList.toggle('active', activeFilters.gens.has(g));
        updateFilterBtn();
      });
    });

    // Still need to populate hidden settings divs for buildSettingsPanel to work
    buildSettingsPanel();
  }

  function updateFilterBtn() {
    document.getElementById('filter-btn').classList.toggle('has-filters', hasActiveFilters());
  }

  document.getElementById('filter-btn').addEventListener('click', () => {
    buildFilterPanel();
    document.getElementById('filter-panel').style.display = 'flex';
  });
  document.getElementById('filter-close').addEventListener('click', () => {
    document.getElementById('filter-panel').style.display = 'none';
    visibleCount = PAGE_SIZE;
    renderResults();
  });
  document.getElementById('filter-panel').addEventListener('click', e => {
    if (e.target === document.getElementById('filter-panel')) {
      document.getElementById('filter-panel').style.display = 'none';
      visibleCount = PAGE_SIZE;
      renderResults();
    }
  });
  document.getElementById('filter-apply').addEventListener('click', () => {
    document.getElementById('filter-panel').style.display = 'none';
    visibleCount = PAGE_SIZE;
    renderResults();
    updateFilterBtn();
  });
  document.getElementById('filter-reset').addEventListener('click', () => {
    activeFilters = { types: new Set(), typeAnd: false, formats: {}, lcMinTier: null, evoFormatsFilter: {}, gens: new Set(), flags: new Set() };
    buildFilterPanel();
    updateFilterBtn();
  });

  /* ── FEEDBACK ── */
  function loadFeedback() {
    try { return JSON.parse(localStorage.getItem('pogo-feedback-v1') || '[]'); } catch(e) { return []; }
  }
  function saveFeedback(items) {
    try { localStorage.setItem('pogo-feedback-v1', JSON.stringify(items)); } catch(e) {}
  }
  async function renderFeedbackList() {
    const list = document.getElementById('feedback-list');
    if (!list) return;
    if (!SB.isAdmin()) { list.innerHTML = ''; return; }
    const items = await SB.loadFeedback();
    if (!items.length) { list.innerHTML = '<div style="font-size:12px;color:var(--text-tertiary);">No feedback yet.</div>'; return; }
    const icons = { bug:'🐛', feature:'✨', other:'💬' };
    list.innerHTML = '<div style="font-size:11px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Feedback (' + items.length + ')</div>' +
      items.map(f =>
        '<div style="font-size:12px;padding:6px 8px;background:var(--bg-secondary);border-radius:6px;margin-bottom:4px;">' +
        '<span style="font-weight:600;">' + (icons[f.type]||'💬') + ' ' + f.type + '</span>' +
        '<span style="color:var(--text-tertiary);margin-left:6px;">' + new Date(f.created_at).toLocaleDateString() + '</span>' +
        '<div style="color:var(--text-secondary);margin-top:2px;">' + f.content + '</div></div>'
      ).join('');
  }
  document.getElementById('info-btn').addEventListener('click', () => {
    document.getElementById('info-overlay').style.display = 'flex';
  });
  document.getElementById('info-close').addEventListener('click', () => {
    document.getElementById('info-overlay').style.display = 'none';
  });
  document.getElementById('info-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('info-overlay'))
      document.getElementById('info-overlay').style.display = 'none';
  });

  document.getElementById('feedback-btn').addEventListener('click', async () => {
    renderFeedbackList();
    document.getElementById('feedback-overlay').style.display = 'flex';
  });
  document.getElementById('feedback-close').addEventListener('click', () => {
    document.getElementById('feedback-overlay').style.display = 'none';
  });
  document.getElementById('feedback-cancel').addEventListener('click', () => {
    document.getElementById('feedback-overlay').style.display = 'none';
  });
  document.getElementById('feedback-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('feedback-overlay'))
      document.getElementById('feedback-overlay').style.display = 'none';
  });
  document.getElementById('feedback-submit').addEventListener('click', async () => {
    const text = document.getElementById('feedback-text').value.trim();
    if (!text) { alert('Please enter a message.'); return; }
    const type = document.getElementById('feedback-type').value;
    try {
      await SB.submitFeedback(type, text);
      document.getElementById('feedback-text').value = '';
      alert('Thank you for your feedback!');
    } catch(e) {
      alert('Could not submit feedback. Please try again.');
    }
  });


  /* ================================================================
    VOTING SYSTEM
    - Each device gets a unique voter ID (stored in localStorage)
    - Suggestions need 3 upvotes to open a formal vote
    - 100 votes or admin close ends a vote
    - Votes expire after 7 days
    - Only affects community ratings, protected by admin acceptance
  ================================================================ */

  const VOTE_UPVOTE_THRESHOLD = 3;
  const VOTE_CLOSE_THRESHOLD  = 100;
  const VOTE_EXPIRY_DAYS      = 7;

  const TIER_GUIDELINES = [
    { tier:'S', desc:'Meta — Format Defining: essential picks that dominate the format' },
    { tier:'A', desc:'Very Strong — Staple Pick: reliable top-tier choices' },
    { tier:'B', desc:'Viable — Solid but not top tier: good in the right team' },
    { tier:'C', desc:'Mediocre — Situational use: needs specific conditions' },
    { tier:'D', desc:'Barely Usable — Hard to justify over better options' },
    { tier:'E', desc:'Bottom Tier — Not worth using in this format' },
  ];

  function getVoterId() {
    let id = localStorage.getItem('pogo-voter-id');
    if (!id) {
      id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('pogo-voter-id', id);
    }
    return id;
  }

  // Votes now loaded from Supabase — cached locally
  let _votesCache = {};
  async function loadVotes() {
    _votesCache = await SB.loadVotes();
    return _votesCache;
  }
  function getVotesCache() { return _votesCache; }

  // votes structure:
  // { "PokemonId_Format": {
  //     status: 'suggestion' | 'open' | 'pending' | 'accepted' | 'rejected',
  //     pokemonId, pokemonName, format, currentTier,
  //     upvotes: { voterId: timestamp },
  //     votes: { tier: { voterId: timestamp } },
  //     created: timestamp, closed: timestamp|null,
  //     result: tier|null
  //   }
  // }

  function getVoteKey(pokemonId, format) { return pokemonId + '__' + format; }

  function isExpired(vote) {
    return (Date.now() - vote.created) > VOTE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  }

  function getActiveVote(pokemonId, format) {
    const votes = loadVotes();
    const key = getVoteKey(pokemonId, format);
    const v = votes[key];
    if (!v) return null;
    if (v.status === 'accepted' || v.status === 'rejected') return null;
    if (isExpired(v) && v.status !== 'pending') {
      // Auto-expire
      v.status = 'pending';
      v.closed = Date.now();
      saveVotes(votes);
    }
    return v;
  }

  function renderVoteSection(pokemonId, pokemonName, format, currentTier) {
    const voterId = getVoterId();
    const vote    = getActiveVote(pokemonId, format);
    const key     = getVoteKey(pokemonId, format);

    const guidelinesHtml = `<div class="vote-guidelines">
      <strong>Tier Definitions:</strong><br>
      ${TIER_GUIDELINES.map(g => `<span style="font-weight:600;color:var(--tier-${g.tier.toLowerCase()})">${g.tier}</span> — ${g.desc}`).join('<br>')}
    </div>`;

    if (!vote) {
      // No active vote — show suggest button
      return `<div class="vote-section" data-fmt="${format}">
        <div class="vote-section-title">Community Vote</div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:12px;color:var(--text-secondary);">Disagree with this rating?</span>
          <button class="vote-suggest-btn" data-action="suggest" data-fmt="${format}" data-id="${pokemonId}" data-name="${pokemonName}" data-tier="${currentTier}">Suggest Change</button>
        </div>
      </div>`;
    }

    if (vote.status === 'suggestion') {
      const upvoteCount  = Object.keys(vote.upvotes||{}).length;
      const hasUpvoted   = voterId in (vote.upvotes||{});
      const remaining    = VOTE_UPVOTE_THRESHOLD - upvoteCount;
      return `<div class="vote-section" data-fmt="${format}">
        <div class="vote-section-title">Rating Change Suggested</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;">
          ${upvoteCount}/${VOTE_UPVOTE_THRESHOLD} upvotes needed to open a formal vote.
          ${remaining > 0 ? `${remaining} more needed.` : ''}
        </div>
        ${guidelinesHtml}
        <div style="margin-top:8px;">
          <button class="vote-upvote-btn ${hasUpvoted?'upvoted':''}" data-action="upvote" data-key="${key}"
            ${hasUpvoted?'disabled':''}>
            ${hasUpvoted ? '✓ Upvoted' : '▲ Upvote'} (${upvoteCount})
          </button>
        </div>
      </div>`;
    }

    if (vote.status === 'open') {
      const totalVotes = Object.values(vote.votes||{}).reduce((s,v)=>s+Object.keys(v).length,0);
      const myVote     = TIERS.find(t => voterId in (vote.votes?.[t]||{}));
      const daysLeft   = Math.max(0, Math.ceil((VOTE_EXPIRY_DAYS * 86400000 - (Date.now()-vote.created))/86400000));

      const barsHtml = SELECTABLE_TIERS.map(t => {
        const count = Object.keys(vote.votes?.[t]||{}).length;
        const pct   = totalVotes ? Math.round(count/totalVotes*100) : 0;
        const TIER_BG = {S:'var(--tier-s)',A:'var(--tier-a)',B:'var(--tier-b)',C:'var(--tier-c)',D:'var(--tier-d)',E:'var(--tier-e)'};
        return `<div class="vote-bar-wrap">
          <div class="vote-bar-label"><span>${t}</span><span>${count} vote${count!==1?'s':''} (${pct}%)</span></div>
          <div class="vote-bar"><div class="vote-bar-fill" style="width:${pct}%;background:${TIER_BG[t]};"></div></div>
        </div>`;
      }).join('');

      const castBtns = SELECTABLE_TIERS.map(t =>
        `<button class="vote-cast-btn ${myVote===t?'voted':''}" data-action="cast" data-key="${key}" data-tier="${t}">${t}</button>`
      ).join('');

      return `<div class="vote-section" data-fmt="${format}">
        <div class="vote-section-title">🗳️ Vote Open — ${totalVotes}/${VOTE_CLOSE_THRESHOLD} votes · ${daysLeft}d left</div>
        ${barsHtml}
        ${guidelinesHtml}
        <div style="margin-top:8px;font-size:12px;color:var(--text-secondary);margin-bottom:4px;">
          ${myVote ? `You voted: <strong>${myVote}</strong>. Change your vote:` : 'Cast your vote:'}
        </div>
        <div>${castBtns}</div>
      </div>`;
    }

    if (vote.status === 'pending') {
      const totalVotes = Object.values(vote.votes||{}).reduce((s,v)=>s+Object.keys(v).length,0);
      const topTier    = SELECTABLE_TIERS.reduce((best,t) => {
        const c = Object.keys(vote.votes?.[t]||{}).length;
        return c > (best.count||0) ? {tier:t,count:c} : best;
      }, {});
      return `<div class="vote-section" data-fmt="${format}">
        <div class="vote-section-title">⏳ Pending Admin Review</div>
        <div style="font-size:12px;color:var(--text-secondary);">
          ${totalVotes} votes cast. Community suggests: <strong>${topTier.tier}</strong> (${topTier.count} votes). Awaiting admin decision.
        </div>
      </div>`;
    }

    return '';
  }

  function handleVoteAction(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action   = btn.dataset.action;
    const voterId  = getVoterId();
    const votes    = loadVotes();

    if (action === 'suggest') {
      const fmt  = btn.dataset.fmt;
      const id   = btn.dataset.id;
      const name = btn.dataset.name;
      const tier = btn.dataset.tier;
      const key  = getVoteKey(id, fmt);
      if (votes[key] && !isExpired(votes[key])) return;
      votes[key] = {
        status:'suggestion', pokemonId:id, pokemonName:name,
        format:fmt, currentTier:tier,
        upvotes:{[voterId]: Date.now()},
        votes:{}, created:Date.now(), closed:null, result:null
      };
      saveVotes(votes);
      renderRatings(getUserEntry(currentId));
      return;
    }

    if (action === 'upvote') {
      const key  = btn.dataset.key;
      const vote = votes[key];
      if (!vote || voterId in (vote.upvotes||{})) return;
      vote.upvotes[voterId] = Date.now();
      if (Object.keys(vote.upvotes).length >= VOTE_UPVOTE_THRESHOLD) {
        vote.status = 'open';
      }
      saveVotes(votes);
      renderRatings(getUserEntry(currentId));
      return;
    }

    if (action === 'cast') {
      const key  = btn.dataset.key;
      const tier = btn.dataset.tier;
      const vote = votes[key];
      if (!vote || vote.status !== 'open') return;
      if (!vote.votes[tier]) vote.votes[tier] = {};
      // Remove previous vote
      SELECTABLE_TIERS.forEach(t => { if (vote.votes[t]) delete vote.votes[t][voterId]; });
      vote.votes[tier][voterId] = Date.now();
      const totalVotes = Object.values(vote.votes).reduce((s,v)=>s+Object.keys(v).length,0);
      if (totalVotes >= VOTE_CLOSE_THRESHOLD) {
        vote.status = 'pending';
        vote.closed = Date.now();
      }
      saveVotes(votes);
      renderRatings(getUserEntry(currentId));
      return;
    }
  }

  /* ── Votes Admin page ─────────────────────────────────────────── */
  function renderVotesAdminPage() {
    const content = document.getElementById('votes-admin-content');
    const votes   = loadVotes();
    const active  = Object.entries(votes).filter(([,v]) =>
      v.status === 'suggestion' || v.status === 'open' || v.status === 'pending'
    );

    if (!active.length) {
      content.innerHTML = '<p style="color:var(--text-tertiary);text-align:center;padding:3rem;">No active votes.</p>';
      return;
    }

    const statusOrder = { pending:0, open:1, suggestion:2 };
    active.sort(([,a],[,b]) => (statusOrder[a.status]||3) - (statusOrder[b.status]||3));

    content.innerHTML = active.map(([key, vote]) => {
      const totalVotes = Object.values(vote.votes||{}).reduce((s,v)=>s+Object.keys(v).length,0);
      const topTier    = SELECTABLE_TIERS.reduce((best,t) => {
        const c = Object.keys(vote.votes?.[t]||{}).length;
        return c > (best.count||0) ? {tier:t,count:c} : best;
      }, {tier:'—',count:0});
      const upvotes    = Object.keys(vote.upvotes||{}).length;
      const daysOld    = Math.floor((Date.now()-vote.created)/86400000);
      const statusBadge = {
        suggestion:`<span style="background:#fff3cd;color:#856404;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;">SUGGESTION</span>`,
        open:`<span style="background:#d1ecf1;color:#0c5460;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;">OPEN</span>`,
        pending:`<span style="background:#f8d7da;color:#721c24;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;">PENDING REVIEW</span>`,
      }[vote.status] || '';

      return `<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1rem;margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
          <div>
            <span style="font-weight:600;">${vote.pokemonName}</span>
            <span style="color:var(--text-tertiary);margin:0 6px;">·</span>
            <span style="color:var(--text-secondary);">${vote.format}</span>
            <span style="color:var(--text-tertiary);margin:0 6px;">·</span>
            <span style="color:var(--text-secondary);">Current: <strong>${vote.currentTier||'U'}</strong></span>
          </div>
          ${statusBadge}
        </div>
        <div style="font-size:12px;color:var(--text-tertiary);margin-top:4px;">${daysOld}d old · ${upvotes} upvotes · ${totalVotes} votes · Top: ${topTier.tier} (${topTier.count})</div>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
          ${vote.status === 'open' || vote.status === 'suggestion' ? `<button class="admin-bar-btn" data-vadmin="close" data-key="${key}" style="font-size:12px;padding:5px 12px;">Close Vote Early</button>` : ''}
          ${vote.status === 'pending' ? `
            <button class="admin-bar-btn" data-vadmin="accept" data-key="${key}" data-tier="${topTier.tier}" style="font-size:12px;padding:5px 12px;background:var(--accent);color:#fff;">✓ Accept (${topTier.tier})</button>
            <button class="admin-bar-btn" data-vadmin="reject" data-key="${key}" style="font-size:12px;padding:5px 12px;">✗ Reject</button>
          ` : ''}
          <button class="admin-bar-btn" data-vadmin="delete" data-key="${key}" style="font-size:12px;padding:5px 12px;color:#c0392b;">Delete</button>
        </div>
      </div>`;
    }).join('');

    // Wire admin actions
    content.querySelectorAll('[data-vadmin]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const votes  = loadVotes();
        const key    = btn.dataset.key;
        const action = btn.dataset.vadmin;
        const vote   = votes[key];
        if (!vote) return;

        try {
          if (action === 'close') {
            await SB.closeVote(vote.id);
          } else if (action === 'accept') {
            const tier = btn.dataset.tier;
            await SB.acceptVote(vote.id, tier, vote.pokemon_id, vote.pokemon_name, vote.format);
            // Update local cache
            const p = allPokemon.find(x => x.id === vote.pokemon_id);
            if (p) {
              const entry = getUserEntry(p.id);
              if (!entry.communityRatings) entry.communityRatings = {};
              entry.communityRatings[vote.format] = tier;
              if (!entry.useMyRatings) entry.ratings[vote.format] = tier;
            }
          } else if (action === 'reject') {
            await SB.rejectVote(vote.id);
          } else if (action === 'delete') {
            await SB.deleteVote(vote.id);
          }
          await loadVotes();
          renderVotesAdminPage();
        } catch(e) { console.error('Admin vote action:', e); }
      });
    });
  }

  /* ── Vote Modal ── */
  function openVoteModal(pokemonId, pokemonName) {
    const modal = document.getElementById('vote-modal');
    const content = document.getElementById('vote-modal-content');
    document.getElementById('vote-modal-title').textContent = '💬 Suggest a Rating Change — ' + pokemonName;

    const guidelinesHtml = `<div class="vote-guidelines" style="margin-bottom:1rem;">
      <strong>Tier Definitions:</strong><br>
      ${TIER_GUIDELINES.map(g => `<span style="font-weight:600">${g.tier}</span> — ${g.desc}`).join('<br>')}
    </div>`;

    // Check existing votes for this pokemon
    const votes = loadVotes();
    const fmtStatuses = FORMATS.map(fmt => {
      const key  = getVoteKey(pokemonId, fmt);
      const vote = votes[key];
      const effectiveRatings = getEffectiveRatings(pokemonId);
      const currentTier = effectiveRatings[fmt] || 'U';
      return { fmt, key, vote, currentTier };
    });

    const voterId = getVoterId();

    function renderModalContent() {
      const votes = loadVotes();
      content.innerHTML = guidelinesHtml +
        '<div style="font-size:12px;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Select a format</div>' +
        fmtStatuses.map(({ fmt, currentTier }) => {
          const key  = getVoteKey(pokemonId, fmt);
          const vote = votes[key];
          const expired = vote && isExpired(vote);
          let statusText = '';
          let actionBtn  = '';

          if (!vote || expired) {
            actionBtn = `<button class="vote-suggest-btn" data-action="suggest" data-fmt="${fmt}" data-id="${pokemonId}" data-name="${pokemonName}" data-tier="${currentTier}">Suggest</button>`;
          } else if (vote.status === 'suggestion') {
            const upvoteCount = Object.keys(vote.upvotes||{}).length;
            const hasUpvoted  = voterId in (vote.upvotes||{});
            statusText = `${upvoteCount}/${VOTE_UPVOTE_THRESHOLD} upvotes`;
            actionBtn  = hasUpvoted
              ? `<button class="vote-upvote-btn upvoted" disabled>✓ Upvoted</button>`
              : `<button class="vote-upvote-btn" data-action="upvote" data-key="${key}">▲ Upvote (${upvoteCount})</button>`;
          } else if (vote.status === 'open') {
            const totalVotes = Object.values(vote.votes||{}).reduce((s,v)=>s+Object.keys(v).length,0);
            const myVote     = SELECTABLE_TIERS.find(t => voterId in (vote.votes?.[t]||{}));
            const daysLeft   = Math.max(0,Math.ceil((VOTE_EXPIRY_DAYS*86400000-(Date.now()-vote.created))/86400000));
            statusText = `🗳️ ${totalVotes}/${VOTE_CLOSE_THRESHOLD} · ${daysLeft}d left`;
            const castBtns = SELECTABLE_TIERS.map(t =>
              `<button class="vote-cast-btn ${myVote===t?'voted':''}" data-action="cast" data-key="${key}" data-tier="${t}">${t}</button>`
            ).join('');
            actionBtn = `<div style="margin-top:4px;">${castBtns}</div>`;
          } else if (vote.status === 'pending') {
            statusText = '⏳ Pending admin review';
          } else if (vote.status === 'accepted' || vote.status === 'rejected') {
            statusText = vote.status === 'accepted' ? '✓ Accepted' : '✗ Rejected';
          }

          return `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
            <span style="min-width:110px;font-size:13px;font-weight:500;">${fmt}</span>
            <span style="font-size:12px;color:var(--text-tertiary);min-width:24px;">→ ${currentTier}</span>
            ${statusText ? `<span style="font-size:11px;color:var(--text-tertiary);">${statusText}</span>` : ''}
            ${actionBtn}
          </div>`;
        }).join('');

      // Wire actions
      content.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const action  = btn.dataset.action;
          const voterId = getVoterId();
          const votes   = loadVotes();

          if (action === 'suggest') {
            const fmt  = btn.dataset.fmt;
            const id   = btn.dataset.id;
            const name = btn.dataset.name;
            const tier = btn.dataset.tier;
            try {
              await SB.createVote(id, name, fmt, tier, voterId);
              await loadVotes();
              renderModalContent();
            } catch(e) { console.error('Create vote:', e); }
            return;
          } else if (action === 'upvote') {
            const voteId = btn.dataset.voteid;
            const upvoteCount = parseInt(btn.dataset.upvotecount || '0');
            try {
              await SB.upvoteVote(voteId, voterId, upvoteCount);
              await loadVotes();
              renderModalContent();
            } catch(e) { console.error('Upvote:', e); }
            return;
          } else if (action === 'cast') {
            const voteId = btn.dataset.voteid;
            const tier   = btn.dataset.tier;
            const total  = parseInt(btn.dataset.total || '0');
            try {
              await SB.castVote(voteId, voterId, tier, total);
              await loadVotes();
              renderModalContent();
            } catch(e) { console.error('Cast vote:', e); }
            return;
          }
        });
      });
    }

    // Notes suggestion content
    const notesContent = document.getElementById('vote-modal-notes-content');
    const notesGuide = `<div class="vote-guidelines" style="margin-bottom:1rem;">
      <strong>What makes a good note suggestion?</strong><br>
      • Niche PvP cup relevance (e.g. "Great in the Kanto Cup")<br>
      • Low cost evolutions worth considering<br>
      • Special or legacy moves it can learn<br>
      • Mega evolution potential<br>
      • Little Cup viability<br>
      • Useful as a gym defender in specific contexts<br>
      <br><em>Keep it factual and specific.</em>
    </div>`;

    async function renderNotesTab() {
      const suggestions = await SB.loadNoteSuggestions();
      const myNote = suggestions.find(s => s.pokemon_id === pokemonId && s.voter_id === getVoterId());
      const voterId = getVoterId();

      if (!myNote) {
        notesContent.innerHTML = notesGuide +
          '<textarea id="note-suggest-text" rows="3" placeholder="Suggest a note to add..." style="width:100%;padding:8px;font-size:13px;font-family:inherit;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-input);color:var(--text-primary);outline:none;resize:vertical;margin-bottom:8px;"></textarea>' +
          '<button id="note-suggest-submit" style="width:100%;padding:8px;font-size:13px;font-family:inherit;border:none;border-radius:8px;background:var(--accent);color:#fff;cursor:pointer;font-weight:600;">Submit Note Suggestion</button>';
        document.getElementById('note-suggest-submit').addEventListener('click', async () => {
          const text = document.getElementById('note-suggest-text').value.trim();
          if (!text) return;
          const votes = loadVotes();
          try {
            await SB.submitNoteSuggestion(pokemonId, pokemonName, text, voterId);
            renderNotesTab().catch(console.error);
          } catch(e) { console.error('Note suggestion:', e); }
        });
      } else if (myNote.status === 'pending') {
        notesContent.innerHTML = notesGuide +
          '<div style="padding:10px;background:var(--bg-secondary);border-radius:8px;font-size:13px;">' +
          '<div style="font-weight:600;margin-bottom:4px;">⏳ Note suggestion pending admin review</div>' +
          '<div style="color:var(--text-secondary);">' + myNote.content + '</div></div>';
      } else {
        notesContent.innerHTML = notesGuide + '<div style="color:var(--text-tertiary);font-size:13px;">Note suggestion ' + myNote.status + '.</div>';
      }
    }

    // Tab switching
    document.getElementById('vote-tab-ratings').addEventListener('click', () => {
      document.getElementById('vote-tab-ratings').style.borderBottomColor = 'var(--accent)';
      document.getElementById('vote-tab-ratings').style.color = 'var(--accent)';
      document.getElementById('vote-tab-ratings').style.fontWeight = '600';
      document.getElementById('vote-tab-notes').style.borderBottomColor = 'transparent';
      document.getElementById('vote-tab-notes').style.color = 'var(--text-tertiary)';
      document.getElementById('vote-tab-notes').style.fontWeight = 'normal';
      document.getElementById('vote-modal-content').style.display = '';
      document.getElementById('vote-modal-notes-content').style.display = 'none';
    });
    document.getElementById('vote-tab-notes').addEventListener('click', () => {
      document.getElementById('vote-tab-notes').style.borderBottomColor = 'var(--accent)';
      document.getElementById('vote-tab-notes').style.color = 'var(--accent)';
      document.getElementById('vote-tab-notes').style.fontWeight = '600';
      document.getElementById('vote-tab-ratings').style.borderBottomColor = 'transparent';
      document.getElementById('vote-tab-ratings').style.color = 'var(--text-tertiary)';
      document.getElementById('vote-tab-ratings').style.fontWeight = 'normal';
      document.getElementById('vote-modal-content').style.display = 'none';
      document.getElementById('vote-modal-notes-content').style.display = '';
      renderNotesTab().catch(console.error);
    });

    renderModalContent();
    modal.style.display = 'flex';
  }

  document.getElementById('suggest-change-btn').addEventListener('click', () => {
    if (!currentId) return;
    const p = allPokemon.find(x => x.id === currentId);
    if (p) openVoteModal(currentId, p.name);
  });
  document.getElementById('vote-modal-close').addEventListener('click', () => {
    document.getElementById('vote-modal').style.display = 'none';
  });
  document.getElementById('vote-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('vote-modal'))
      document.getElementById('vote-modal').style.display = 'none';
  });

  document.getElementById('votes-admin-btn').addEventListener('click', () => {
    if (!Auth.isLoggedIn()) return;
    renderVotesAdminPage();
    document.getElementById('votes-admin-view').style.display = 'block';
    window.scrollTo(0,0);
  });
  document.getElementById('votes-admin-back').addEventListener('click', () => {
    document.getElementById('votes-admin-view').style.display = 'none';
    document.getElementById('home-view').classList.add('active');
    if (dataLoaded) renderResults();
  });

  async function initApp() {
    // Init Supabase auth
    await SB.init();

    // Load data from Supabase in parallel
    const [communityRatings, adminRatings, notes, flags] = await Promise.all([
      SB.loadRatings(),
      SB.loadAdminRatings(),
      SB.loadNotes(),
      SB.loadFlags(),
    ]);

    // Populate userDb from Supabase data
    for (const [pokemonId, formats] of Object.entries(communityRatings)) {
      const entry = getUserEntry(pokemonId);
      entry.communityRatings = formats;
      if (!entry.useMyRatings) {
        for (const [fmt, tier] of Object.entries(formats)) entry.ratings[fmt] = tier;
      }
    }
    for (const [pokemonId, formats] of Object.entries(adminRatings)) {
      const entry = getUserEntry(pokemonId);
      entry.myRatings = formats;
      if (entry.useMyRatings) {
        for (const [fmt, tier] of Object.entries(formats)) entry.ratings[fmt] = tier;
      }
    }
    for (const [pokemonId, content] of Object.entries(notes)) {
      const entry = getUserEntry(pokemonId);
      entry.notes = content;
    }
    for (const [pokemonId, flagData] of Object.entries(flags)) {
      const entry = getUserEntry(pokemonId);
      entry.evolveWorthy   = flagData.evolve_worthy;
      entry.manualEvolve   = flagData.manual_evolve;
      entry.considerCatch  = flagData.consider_catch;
      entry.manualConsider = flagData.manual_consider;
      entry.autoEvolve     = flagData.auto_evolve;
      entry.autoLC         = flagData.auto_lc;
    }

    // Load votes cache
    await loadVotes();

    // Sync watchlist if logged in
    await syncWatchlist();

    refreshAdminUI();
  }

  loadUserDb();
  refreshAdminUI();
  initApp().catch(console.error);
  // Load all Pokémon immediately on page open
  ensureDataLoaded().then(ok => { if (ok) { autoSetEvolveFlags(); autoSetLCFlags(); renderLegend(); renderResults(); } });