FROM debian:bullseye-20220622 AS installer

RUN apt-get update && \
    apt-get install -y curl

ARG HUGO_REPO=gohugoio/hugo
ARG HUGO_VERSION=0.101.0
RUN curl -fsSL -o ./hugo.deb https://github.com/${HUGO_REPO}/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb
RUN apt-get install ./hugo.deb

ARG SASS_REPO=sass/dart-sass-embedded
ARG SASS_VERSION=1.53.0
RUN curl -fsSL -o ./sass.tar.gz https://github.com/${SASS_REPO}/releases/download/${SASS_VERSION}/sass_embedded-${SASS_VERSION}-linux-x64.tar.gz
RUN tar -xvf ./sass.tar.gz -C /

FROM node:16.17.0-bullseye

RUN npm install -g pnpm

COPY --from=installer /usr/local/bin/hugo /usr/local/bin/hugo
COPY --from=installer /sass_embedded/dart-sass-embedded /usr/local/bin/dart-sass-embedded
