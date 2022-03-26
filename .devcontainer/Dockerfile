FROM debian:bullseye-20220316 AS installer

RUN apt update && \
	apt install -y curl

ENV HUGO_VERSION=0.96.0

RUN curl -L -o ./hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN apt install ./hugo.deb

FROM denoland/deno:debian-1.20.3

RUN apt update && \
	apt install -y git gnupg2 && \
	rm -rf /ver/lib/apt/lists/* && \
	mkdir /home/deno && \
	chmod 777 -R /deno-dir/

USER deno

COPY --from=installer /usr/local/bin/hugo /usr/local/bin/hugo
