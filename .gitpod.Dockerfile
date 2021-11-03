FROM gitpod/workspace-full:latest

ARG version=0.89.0

RUN wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_extended_${version}_Linux-64bit.deb

USER root
RUN apt install /tmp/hugo.deb
