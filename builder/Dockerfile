FROM debian:bullseye-20220622 AS installer

RUN apt-get update && \
    apt-get install -y curl

ARG HUGO_REPO=gohugoio/hugo
ARG HUGO_VERSION=0.111.3
RUN curl -fsSL -o ./hugo.deb https://github.com/${HUGO_REPO}/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb
RUN apt-get install ./hugo.deb

ARG SASS_REPO=sass/dart-sass-embedded
ARG SASS_VERSION=1.62.1
RUN curl -fsSL -o ./sass.tar.gz https://github.com/${SASS_REPO}/releases/download/${SASS_VERSION}/sass_embedded-${SASS_VERSION}-linux-x64.tar.gz
RUN tar -xvf ./sass.tar.gz -C /

FROM node:18.15.0-bullseye

RUN npm install -g pnpm

COPY --from=installer /usr/local/bin/hugo /usr/local/bin/hugo
COPY --from=installer /sass_embedded/* /usr/local/bin/
