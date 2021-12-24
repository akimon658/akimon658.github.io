FROM gitpod/workspace-full:latest

ARG HUGO_VERSION=0.91.2

RUN wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

USER root
RUN apt install /tmp/hugo.deb
