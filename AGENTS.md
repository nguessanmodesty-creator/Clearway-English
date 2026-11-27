# AETERNA — notes de développement

Site vitrine statique (HTML/CSS/JS, sans build) de la maison de haute joaillerie
AETERNA. `index.html` est la page d'entrée ; l'ancien site Clearway English reste
disponible à la racine sous `Clearway_English_Mon_Prof_WhatsApp.html`.

## Lancer le site

```sh
docker compose -f docker-compose.base44.yml up -d
```

`nginx:alpine` sert le dépôt en lecture seule sur le port 3000 (voir `nginx.conf`).
Aucune compilation : modifier un fichier et recharger la page suffit. Les réponses
sont envoyées avec `Cache-Control: no-store` pour que la prévisualisation montre
toujours la source courante.

Les workers nginx tournent en `root` : le dossier source monté dans le bac à sable
n'est lisible que par son propriétaire, et un worker `nginx` ne pourrait pas le
parcourir (403 sur `/`).

## Structure

- `index.html` — hero « Prism », collections, sélection, origines
- `archive.html` + `assets/js/archive.js` — mosaïque asymétrique, filtre « mood de lumière »
- `piece.html` + `assets/js/piece.js` — détail en trois cadres à défilement horizontal
- `philosophy.html` — manifeste, principes, carte des origines
- `checkout.html` + `assets/js/checkout.js` — panier et formulaire en une colonne
- `assets/js/data.js` — les huit pièces (palettes, prix, origines)
- `assets/js/site.js` — menu « verre », barre de navigation, panier `localStorage`, révélations

## Vérifications

- `curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/archive.html`
- Les visuels de pierres sont générés en CSS (`.gem` + palette `--g1..--g4`), il n'y a
  pas d'images à charger.
- Le panier est stocké sous la clé `localStorage['aeterna.cart']` (aucun backend,
  aucun paiement : le formulaire enregistre une demande de mise en relation).
