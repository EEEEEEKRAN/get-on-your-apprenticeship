# Dockerfile

# Étape 1 : Utilisez une image Node.js pour construire votre application
FROM node:14 as build

# Créez un répertoire pour contenir le code de l'application
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

RUN ls -la /usr/src/app

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste du code de l'application
COPY . .

# Construisez l'application pour la production
RUN npm run build

# Étape 2 : Utilisez une image Nginx pour servir votre application
FROM nginx:1.19.0-alpine

# Créez un répertoire pour contenir les fichiers de l'application
WORKDIR /usr/share/nginx/html

# Copiez les fichiers de build de l'étape 1 dans le répertoire de Nginx
COPY --from=build /usr/src/app/build .

# Exposez le port 80 pour Nginx
EXPOSE 80

# Démarrez Nginx
CMD ["nginx", "-g", "daemon off;"]