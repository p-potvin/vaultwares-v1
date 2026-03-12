FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
# Install all dependencies so we get tsx and typescript
RUN npm install

COPY server.ts ./
COPY src ./src

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use npx tsx to execute the TypeScript server
CMD ["npx", "tsx", "server.ts"]
