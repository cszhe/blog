FROM nginx:alpine
MAINTAINER Jason He

COPY _site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
