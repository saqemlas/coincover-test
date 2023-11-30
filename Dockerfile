# STEP 1 : install dev dependencies & bundle code
FROM public.ecr.aws/docker/library/node:20.5.1-alpine as builder

WORKDIR /usr/app

RUN apk update

ARG ENVIRONMENT=local

COPY package.json yarn.lock tsconfig.json .env.$ENVIRONMENT ./

COPY src ./src

RUN yarn run ci
RUN ls && yarn run bundle

# STEP 2 : copy bundled code & install production dependencies to clean container

FROM public.ecr.aws/docker/library/node:20.5.1-alpine 

WORKDIR /usr/app

ARG ENVIRONMENT=local
ENV NODE_ENV $ENVIRONMENT

COPY --chown=node:node --from=builder /usr/app/package.json ./
COPY --chown=node:node --from=builder /usr/app/.env.$ENVIRONMENT  ./
COPY --chown=node:node --from=builder /usr/app/build ./

RUN yarn run ci --production=true
RUN yarn cache clean

EXPOSE 3000

USER node

CMD ["node", "index.js"]
