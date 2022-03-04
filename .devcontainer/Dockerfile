FROM debian:11.2 AS installer

RUN apt update && \
	apt install -y curl

RUN export HUGO_VERSION=$(curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest | grep tag_name | awk '{print substr($2, 3, length($2)-4)}') && \
	curl -L -o ./hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN apt install ./hugo.deb

FROM denoland/deno:debian-1.19.2

RUN apt update && \
	apt install -y git gnupg2 && \
	rm -rf /ver/lib/apt/lists/* && \
	mkdir /home/deno && \
	chmod 777 -R /deno-dir/

USER deno

COPY --from=installer /usr/local/bin/hugo /usr/local/bin/hugo
