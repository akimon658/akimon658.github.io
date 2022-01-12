FROM gitpod/workspace-full:latest

ARG HUGO_VERSION=0.92.0

RUN wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

USER root

COPY --from=denoland/deno:bin-1.17.3 /deno /usr/local/bin/deno
RUN apt install /tmp/hugo.deb
