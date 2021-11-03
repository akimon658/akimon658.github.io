FROM gitpod/workspace-full:latest

ARG version=0.89.0

USER root
RUN wget -O /usr/local/bin/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_extended_${version}_Linux-64bit.deb
