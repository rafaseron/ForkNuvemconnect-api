## Nuvem Connect Api

### Requisitos

- plataforma: [Nodejs](https://nodejs.org/en)
- gerenciador de pacotes: pnpm
- [Docker](https://docs.docker.com/engine/install/)

### Configurando o ambiente e rodando o projeto

1. Instalar o node

   - v20 (LTS)
   - https://nodejs.org/en

2. Instalar o docker

   - https://docs.docker.com/engine/install/

```bash
# 3. instalar pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
# ou
npm install -g pnpm

# 4. instalar dependências
pnpm install

# 5. criar um arquivo .env com as variáveis de .env-example

# 6. iniciar docker
docker compose up -d

# 7. iniciar servidor
pnpm run dev

# Testes
pnpm test
```

O servidor será iniciado em: http://localhost:3000 | http://127.0.0.1:3000
