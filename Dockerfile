FROM nodered/node-red
COPY . .
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production
