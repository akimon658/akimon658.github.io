FROM debian:bullseye-20220527 AS installer

RUN apt-get update && \
    apt-get install -y curl

ARG HUGO_VERSION=0.100.2

RUN curl -L -o ./hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN apt-get install ./hugo.deb

FROM node:18.3.0-bullseye

RUN npm install -g pnpm

COPY --from=installer /usr/local/bin/hugo /usr/local/bin/hugo
