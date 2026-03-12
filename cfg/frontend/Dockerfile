# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY index.html vite.config.ts tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

# Stage 2: Production runtime with nginx
FROM nginx:alpine

# Copy nginx config
COPY cfg/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from builder stage (Vite outputs to dist, not build)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
