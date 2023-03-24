FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

COPY --from=ghcr.io/akimon658/akimon658.github.io:latest /usr/local/bin/hugo /usr/local/bin/hugo
COPY --from=ghcr.io/akimon658/akimon658.github.io:latest /sass_embedded/dart-sass-embedded /usr/local/bin/dart-sass-embedded

SHELL [ "/bin/bash", "-c" ]

USER vscode

RUN curl -fsSL https://get.pnpm.io/install.sh | sh - && \
    source ~/.bashrc && \
    pnpm env use --global lts
