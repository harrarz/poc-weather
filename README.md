# Candidat : HARRAR Mhamed

## Fonctionnalités Principales
- Récupération des données météorologiques basée sur la géolocalisation
- Design réactif optimisé pour les interfaces desktop et mobile
- Mise en place d'un système de mise en cache pour optimiser l'utilisation de l'API
- Mises à jour en temps réel des données météorologiques lors des changements de localisation

## Gestion de la Clé API
Dans le cadre de cet exercice, la clé API OpenWeatherMap a été incluse directement dans le code source :

```javascript
const API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
// const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY || '';
```

Il est important de noter que dans un environnement de production, j'aurais géré la clé API via des variables d'environnement pour assurer les meilleures pratiques de sécurité. La ligne commentée démontre l'implémentation qui serait utilisée dans un tel scénario.

## Implémentation du Cache
Pour optimiser les performances et respecter les limites d'utilisation de l'API, un système de mise en cache a été implémenté avec les caractéristiques suivantes :

- Les données météorologiques sont stockées dans le localStorage du navigateur après chaque appel API
- Les données en cache ont une période de fraîcheur de 10 minutes
- Les requêtes effectuées pendant la période de fraîcheur récupèrent les données en cache
- L'expiration du cache ou l'absence de données en cache déclenche une nouvelle requête API