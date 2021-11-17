FROM gitpod/workspace-full:latest

ARG hugo-version=0.89.4

RUN wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${hugo-version}/hugo_extended_${hugo-version}_Linux-64bit.deb

USER root
RUN apt install /tmp/hugo.deb
