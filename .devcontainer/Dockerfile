FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

RUN curl -fsSL https://get.pnpm.io/install.sh | bash - && \
    pnpm env use --global lts

COPY --from=ghcr.io/akimon658/akimon658.github.io:latest /usr/local/bin/hugo /usr/local/bin/hugo
COPY --from=ghcr.io/akimon658/akimon658.github.io:latest /sass_embedded/dart-sass-embedded /usr/local/bin/dart-sass-embedded
