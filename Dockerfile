FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY server ./server

ENV NODE_ENV=production
ENV PORT=8080
ENV DATA_DIRECTORY=/app/data

VOLUME ["/app/data"]

EXPOSE 8080

CMD ["npm", "run", "api"]
