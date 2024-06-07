# Use uma imagem base oficial do Node.js
FROM node:20

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
