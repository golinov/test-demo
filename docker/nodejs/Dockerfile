FROM node:16-alpine3.13

RUN npm i -g @nestjs/cli

#
# Configure user
#

ARG UID
ARG GID

RUN apk --no-cache add shadow curl \
    && usermod -u $UID node \
    && groupmod -g $GID node

USER node

WORKDIR /var/www

#
# Do not stop container, and handle SIGTERM from docker stop or down
#
CMD node -e 'setInterval(() => {}, 60000); process.on("SIGTERM", () => { process.exit(0); });'