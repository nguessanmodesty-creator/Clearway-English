/* AETERNA — archive of pieces.
   Each piece carries its own "light palette": the gem gradients are derived
   from these four tones, so every piece reads as a different stone. */
window.AETERNA = {
  moods: [
    { key: 'all', label: 'Toutes les lumières' },
    { key: 'brillant', label: 'Brillant' },
    { key: 'mood', label: 'Mood' },
    { key: 'crepuscule', label: 'Crépuscule' }
  ],
  pieces: [
    {
      id: 'anneau-basalte',
      name: 'Anneau Basalte',
      collection: 'Collection Basalte',
      price: 3480,
      mood: 'brillant',
      palette: ['#0b0b0b', '#3a342c', '#b99a6d', '#f6f1e6'],
      material: 'Or 18 carats recyclé',
      stone: 'Diamant taille brillant',
      carat: '0,85 ct',
      origin: { place: 'Cullinan, Afrique du Sud', coords: '25°40′ S — 28°31′ E' },
      description:
        "Un anneau massif, presque brut, dont la surface conserve les traces du marteau. Le diamant y est serti à l’horizontale : la lumière ne le traverse pas, elle s’y arrête.",
      details: ['Façonné à la main — 42 heures', 'Or 18 ct recyclé, traçable', 'Serti clos, 6 griffes', 'Livré dans un écrin de basalte']
    },
    {
      id: 'solitaire-eclat',
      name: 'Solitaire Éclat',
      collection: 'Collection Prisme',
      price: 6900,
      mood: 'brillant',
      palette: ['#0a0c0e', '#2c3a42', '#9fb8c4', '#ffffff'],
      material: 'Platine 950',
      stone: 'Diamant taille émeraude',
      carat: '1,24 ct',
      origin: { place: 'Orapa, Botswana', coords: '21°18′ S — 25°22′ E' },
      description:
        "La monture disparaît. Ne reste que la pierre, tenue par quatre griffes d’un demi-millimètre, comme suspendue au-dessus du doigt.",
      details: ['Platine 950 recyclé', 'Diamant certifié, traçabilité intégrale', 'Griffes tirées à la main', 'Gravure intérieure offerte']
    },
    {
      id: 'sceau-obsidienne',
      name: 'Sceau d’Obsidienne',
      collection: 'Collection Minérale',
      price: 2240,
      mood: 'crepuscule',
      palette: ['#08080a', '#241f2b', '#6c5f7d', '#e6dfe8'],
      material: 'Argent noirci, or jaune',
      stone: 'Obsidienne taillée',
      carat: '4,10 ct',
      origin: { place: 'Hekla, Islande', coords: '63°59′ N — 19°42′ O' },
      description:
        "Une pierre volcanique taillée en cabochon, montée sur un chaton d’or qui semble l’avoir recueillie plutôt que sertie.",
      details: ['Obsidienne naturelle, non traitée', 'Argent 925 noirci à la main', 'Chaton or 18 ct', 'Pièce unique, numérotée']
    },
    {
      id: 'bague-meridienne',
      name: 'Bague Méridienne',
      collection: 'Collection Méridienne',
      price: 4150,
      mood: 'mood',
      palette: ['#0d0b09', '#3f342a', '#c8a87f', '#fbf3e3'],
      material: 'Or 18 carats, bronze',
      stone: 'Citrine fumée',
      carat: '2,30 ct',
      origin: { place: 'Minas Gerais, Brésil', coords: '18°30′ S — 44°00′ O' },
      description:
        "Deux arcs d’or se croisent sans se toucher. La citrine repose dans l’intervalle, retenue par la seule tension de la géométrie.",
      details: ['Or 18 ct et bronze patiné', 'Citrine non chauffée', 'Anneau ajustable sur 2 tailles', 'Façonné en France']
    },
    {
      id: 'pendentif-rosace',
      name: 'Pendentif Rosace',
      collection: 'Collection Prisme',
      price: 3120,
      mood: 'brillant',
      palette: ['#0b0d0c', '#2f3a35', '#9db5a7', '#f2fbf5'],
      material: 'Or blanc 18 carats',
      stone: 'Sept diamants, 0,42 ct total',
      carat: '0,42 ct',
      origin: { place: 'Catoca, Angola', coords: '9°24′ S — 20°18′ E' },
      description:
        "Sept pierres disposées en rosace, à hauteur d’œil. Le motif est invisible de face : il n’apparaît qu’en lumière rasante.",
      details: ['Or blanc 18 ct recyclé', 'Sept diamants taille brillant', 'Chaîne 42 cm ajustable', 'Traçabilité documentée']
    },
    {
      id: 'boucles-prisme',
      name: 'Boucles Prisme',
      collection: 'Collection Prisme',
      price: 2760,
      mood: 'crepuscule',
      palette: ['#0a0a0d', '#2a2a38', '#7b7d9c', '#e8e9f4'],
      material: 'Or 18 carats, cristal de roche',
      stone: 'Cristal de roche facetté',
      carat: '3,60 ct',
      origin: { place: 'Antsirabe, Madagascar', coords: '19°52′ S — 47°02′ E' },
      description:
        "Deux prismes de cristal brut, à peine polis, qui fragmentent la lumière en franges presque imperceptibles.",
      details: ['Cristal de roche non traité', 'Or 18 ct recyclé', 'Fermoir à vis, 12 mm', 'Poids 7,4 g la paire']
    },
    {
      id: 'manchette-colonnade',
      name: 'Manchette Colonnade',
      collection: 'Collection Basalte',
      price: 5480,
      mood: 'mood',
      palette: ['#0c0b0a', '#42382d', '#c9a97c', '#f7eddb'],
      material: 'Or 18 carats martelé',
      stone: 'Aucune — or seul',
      carat: '—',
      origin: { place: 'Atelier de Genève', coords: '46°12′ N — 6°08′ E' },
      description:
        "Sept colonnes d’or martelé, soudées à froid. La pièce pèse son poids : c’est un objet d’architecture porté au poignet.",
      details: ['Or 18 ct recyclé, 58 g', 'Martelage à la main', 'Ouverture discrète à charnière', 'Édition de 12 pièces']
    },
    {
      id: 'solitaire-nebuleuse',
      name: 'Solitaire Nébuleuse',
      collection: 'Collection Minérale',
      price: 7650,
      mood: 'crepuscule',
      palette: ['#070709', '#241c2e', '#8f7a9e', '#f0e7f6'],
      material: 'Or gris 18 carats',
      stone: 'Saphir violet non chauffé',
      carat: '1,90 ct',
      origin: { place: 'Ilakaka, Madagascar', coords: '22°40′ S — 45°13′ E' },
      description:
        "Un saphir violet, non chauffé, dont la couleur change selon l’heure. La monture en or gris est volontairement plus sombre que la pierre.",
      details: ['Saphir non chauffé, certificat gemmologique', 'Or gris 18 ct', 'Serti clos, 4 griffes', 'Pièce unique']
    }
  ]
};
