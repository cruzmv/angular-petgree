# https://wkrzywiec.medium.com/build-and-run-angular-application-in-a-docker-container-b65dbbc50be8
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/petgree /usr/share/nginx/html