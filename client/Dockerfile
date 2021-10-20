FROM node:14.14.0-alpine as builder
WORKDIR /app
COPY ./package.json ./
COPY . .
# I don't want to download every time when I build. So I'm copying node_modules folder too for now.
#RUN npm i 
#CMD ["npm","run","start"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html