FROM debian:bullseye-20220509 AS installer

RUN apt-get update && \
    apt-get install -y curl

ARG HUGO_VERSION=0.99.1

RUN curl -L -o ./hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN apt-get install ./hugo.deb

FROM denoland/deno:debian-1.22.0

ARG IS_ACTION=0

RUN mkdir /home/deno && \
    if [ ${IS_ACTION} -eq 0 ] ; then \
        apt-get update && \
        apt-get install -y git gnupg2 ;\
        rm -rf /var/lib/apt-get/lists/* ;\
        chown deno -R /deno-dir/ ;\
    fi

USER deno

COPY --from=installer /usr/local/bin/hugo /usr/local/bin/hugo
