FROM nginx:alpine
MAINTAINER Jason He

COPY _site /usr/share/nginx/html
