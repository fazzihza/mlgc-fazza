FROM node:18.17.1
WORKDIR /usr/src/app
ENV MODEL_URL='https://storage.googleapis.com/submisiion-agung/model.json'
ENV PORT=8080
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","run", "start"]