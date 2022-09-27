FROM nodered/node-red
COPY . .
WORKDIR . 
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production
