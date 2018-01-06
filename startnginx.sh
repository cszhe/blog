docker run -d --name myblog --restart=always -v /home/ubuntu/dev/blog/output:/usr/share/nginx/html:ro -p 8000:80 nginx

