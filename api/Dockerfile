# Dockerfile

# Étape 1 : Utilisez une image Node.js pour construire votre application
FROM node:14

# Créez un répertoire pour contenir le code de l'application
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste du code de l'application
COPY . .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 3000

# Démarrez l'application
CMD [ "node", "server.js" ]