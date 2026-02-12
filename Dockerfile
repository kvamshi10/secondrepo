# FROM nginx:alpine
# COPY index.html /usr/share/nginx/html/index.html
FROM nginx:alpine

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]