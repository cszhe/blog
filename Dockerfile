FROM nginx:alpine
MAINTAINER Jason He

COPY output /usr/share/nginx/html
