# projet2-graphql

## Lancer projets 
1. Installez les dépendances pour le backend et le frontend :
```
cd projet2-graphql-api
npm install
cd projet2-graphql-frontend
npm install
```
2. Créer une base de données MySQL
3. Lancer l'app
- Back : 
```
cd projet2-graphql-api 
npm run dev 
```
- Front : 
```
cd projet2-graphql-frontend 
npm start 
```

## Fonctionnalités
- Ajout de nouveaux posts (titre, lien, auteur)
- Affichage de la liste des posts
- Tri des posts par date (plus récents / plus anciens)
- Ajout de commentaires aux posts
- Suppression de posts
- Affichage d'un post avec ses commentaires

## Techno
- Backend : Node.js, Apollo Server, GraphQL, Sequelize (MySQL)
- Frontend : React, Apollo Client, GraphQL, Tailwind CSS
- Base de données : MySQL
