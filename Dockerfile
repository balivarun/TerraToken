# Use Node.js as the base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json files
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy project files
COPY frontend ./frontend
COPY backend ./backend

# Build frontend
RUN cd frontend && npm run build

# Move frontend build to backend/public
RUN mkdir -p /app/backend/public
RUN mv /app/frontend/build/* /app/backend/public/

# Set working directory to backend
WORKDIR /app/backend

# Expose port for backend
EXPOSE 3000

# Start the application
CMD ["node", "src/app.js"]