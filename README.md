[![Author](https://img.shields.io/badge/author-dyhalmeida-D54F44?style=flat-square)](https://github.com/dyhalmeida)
[![Languages](https://img.shields.io/github/languages/count/dyhalmeida/rocketbox-mobile)](#)
[![Size](https://img.shields.io/github/repo-size/dyhalmeida/rocketbox-mobile)](#)
[![Last commit](https://img.shields.io/github/last-commit/dyhalmeida/rocketbox-mobile)](https://github.com/dyhalmeida/rocketbox-mobile/commits/master)
[![License](https://img.shields.io/badge/license-MIT-red)](#)  

<h4 align="center">
    <img src=".github/logo@3x.png" width="250px" /><br>
    <b>Rocketbox é uma aplicação simples semelhante ao dropbox com a funcionalidade de fazer upload de imagens</b> 📦
</h4>

<p align="left">
    Essa aplicação foi codada durante a semana omnistack 6 da rocketseat com a finalidade
    de aprender como desenvolver um pequeno projeto em React Native. Como esta aplicação aprendi como fazer acesso a galeria ou camera com a lib <strong>react-native-image-picker</strong>, acessar arquivos no dispositivo com <strong>react-native-fs</strong>, além de abrir arquivos com <strong>react-native-file-viewer</strong>. Esses pontos citados foi os conhecimentos mais importantes, além dos conceitos aplicados na prática de <strong>statefull e stateless</strong>, componentes, socket.io e outros.
</p>

## 📱 Screenshot
<div align="center" >
  <img src="./.github/screenshot-mobile.png" alt="Rocketbox" width="400">
</div>

## 📑 Tecnologias utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- ✔️ [React JS](https://reactnative.dev/)
- ✔️ [Socket.io Client](https://github.com/socketio/socket.io-client)
- ✔️ [Axios](https://github.com/axios/axios#readme)
- ✔️ [Date-fns](https://date-fns.org/)

## 📍 Features

- ✔️ Criar um box para armazenar arquivos
- ✔️ Upload de arquivos

## 🚀 Começando

### 💻 Clone o respositório

```bash
git clone https://github.com/dyhalmeida/rocketbox-mobile
```

### 💻 Instalação

```bash
npm install
```

### 💻 Iniciando projeto

> Para iniciar o projeto no dipositivo ou emulador, é necessário
possui o ambiente de desenvolvimento configurado com as variáveis de ambiente
do SDK Android Studio e JDK >= 8 (Java) 

```bash
# Iniciar Metro Server
npm start

# Iniciar Debug Build no dispositivo conectado via USB
npm run android
```