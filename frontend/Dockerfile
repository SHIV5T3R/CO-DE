# === CONFIGURE ===
# use Node LTS (18.17.1)
FROM node:18.17.1-alpine3.18 as build
# set working directory
WORKDIR /src
# copy package.json and package-lock.json
COPY package*.json ./

# === BUILD ===
# install dependencies (ci: clean install; only=production: only install dependencies for production)
RUN npm ci 
# copy source code
COPY . .
# build app
RUN npm run build

# === DEPLOY ===
ENV NODE_ENV=production
# expose port 3000
EXPOSE 3000

# === RUN ===
CMD ["npm", "run", "serve"]
