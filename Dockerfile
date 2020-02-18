FROM node:12.7.0-alpine

ARG ACTION_COMMAND=prod
ENV ACTION_COMMAND=$ACTION_COMMAND
ENV BACKEND_URL=''

WORKDIR /usr/src/app
COPY . .

#ENV devApkList \
#  git

#RUN
#    apk --no-cache --update add \
#      ${devApkList} && \
RUN npm config set registry https://registry.npm.taobao.org/ && \
    yarn install && \
    cd front-source/flow && \
    yarn install && \
    cd ../../ && \
    npm run build && \
    rm -rf /tmp/* \
    /var/cache/apk/* \
    logs/ \
    npm-debug.log \
    yarn-error.log \
    node_modules/ \
    front-source/flow/node_modules/ \
    coverage/ \
    .idea/ \
    run/ \
    .DS_Store \
    *.sw* \
    *.un~ \
    .vscode/ \
    app/public/* && \
    #  apk del \
    #    ${devApkList} && \
    rm -rf package-lock.json \
    build \
    /var/cache/apk/* \
    common-static/ \
    front-source/ \
    manage-source/ \
    .postcssrc.js/


FROM node:12.7.0-alpine
ARG ACTION_COMMAND=prod
ENV ACTION_COMMAND=$ACTION_COMMAND
ENV BACKEND_URL=''

WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/server server
COPY --from=0 /usr/src/app/package.json package.json
COPY --from=0 /usr/src/app/yarn.lock yarn.lock
COPY --from=0 /usr/src/app/pm2.config.prod.json pm2.config.prod.json

RUN yarn install --production && \
    npm cache clean --force


CMD npm config set vue-manage-system:backendUrl $BACKEND_URL && \
    npm run $ACTION_COMMAND

EXPOSE 4001