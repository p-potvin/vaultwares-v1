FROM node:18-alpine

WORKDIR /app

# Install dependencies (we install all dependencies to get vite and tsx)
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source files
COPY . .

# Accept GEMINI_API_KEY as a build argument for the Vite frontend
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Build the Vite frontend (outputs to /app/dist)
RUN npm run build

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Healthcheck targeting the unified container port
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the unified server using tsx
CMD ["npx", "tsx", "server.ts"]
