FROM docker:dind
RUN apk add nodejs-current nodejs-current-npm nginx openrc docker
WORKDIR /app
COPY ["package*.json", "./"]
RUN npm install
COPY [".", "./"]
RUN npm run build 
RUN cp -R /app/dist /var/www/localhost/htdocs/dist 
COPY ["conf.d/default.conf", "/etc/nginx/conf.d/default.conf"]
RUN mkdir /run/nginx/ && touch /run/nginx/nginx.pid 
COPY ["./server", "./"]
RUN rc-update add docker boot
COPY ["entrypoint.sh", "/"]
RUN chmod 777 /entrypoint.sh
EXPOSE 80
CMD /entrypoint.sh