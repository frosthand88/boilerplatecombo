FROM nginx:alpine

# Copy Angular dist output
COPY dist/boilerplate-combo/browser /usr/share/nginx/html/angular/

# Custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
