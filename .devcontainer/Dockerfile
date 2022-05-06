FROM debian:bullseye-20220418 AS installer

RUN apt update && \
	apt install -y curl

ENV HUGO_VERSION=0.98.0

RUN curl -L -o ./hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN apt install ./hugo.deb

FROM denoland/deno:debian-1.21.1

ARG IS_ACTION=0

RUN mkdir /home/deno && \
	apt update && \
	apt install -y git && \
	if [ ${IS_ACTION} -eq 0 ] ; then \
		apt install -y gnupg2 ;\
		rm -rf /var/lib/apt/lists/* ;\
		chmod 777 -R /deno-dir/ ;\
	fi

USER deno

COPY --from=installer /usr/local/bin/hugo /usr/local/bin/hugo
