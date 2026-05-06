# ── Stage 1: Build ──────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Serve with nginx ───────────────────────
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run requires listening on $PORT (default 8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
