FROM python:3.12-slim

# Ferramentas básicas de desenvolvimento
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Cria usuário não-root "vscode" (padrão dev containers)
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME} \
    && echo "${USERNAME} ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}

USER ${USERNAME}
WORKDIR /home/${USERNAME}
