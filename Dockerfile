FROM nginx:stable
WORKDIR /app
COPY dist/antrian-poli /usr/share/nginx/html