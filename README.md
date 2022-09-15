# test_lbc

Test technique pour Leboncoin consistant à réaliser une API REST pour exécuter un fizz-buzz.

## Run

Exécuter les commandes suivantes dans la console :

```console
docker-compose build --no-cache
docker-compose up -d
```

Cela permet de lancer à la fois le container de l'application et le container de la base de données.

## Tests

Pour lancer les tests, exécuter les commandes suivantes dans la console :

```console
npm i
npm test
```

## Choix techniques

Le test est réalisé en NodeJS étant donné que c'est le langage avec lequel je me sens le plus à l'aise.  
J'ai choisi d'utiliser un postgres pour stocker les différentes requêtes sur l'API, par souci de praticité et de simplicité étant donné que ça reste un test technique et que le volume de données ne devrait pas être démentiel.

## Pistes d'amélioration

Dans les pistes d'améliration assez évidentes que je vois, il y a :

- L'utilisation d'un autre moyen de stockage supportant un grand nombre d'entrées
- Le passage des variables de connexion à la base de données dans un système permettant de ne pas les mettre en clair sur github :)
- Des tests plus complets et totalement bouchonnés, notamment sur le endpoint /statistics
