FROM nodered/node-red
COPY . .
WORKDIR . 
RUN dir -s
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production
