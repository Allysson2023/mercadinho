# Esta pasta faz parte da outra "backend"
# 🛒 Mercadinho Online

Sistema web de um mini mercado online, onde usuários podem visualizar produtos, adicionar ao carrinho e finalizar pedidos.

O sistema também possui uma área administrativa para gerenciamento completo dos produtos.

---

## 🚀 Funcionalidades

### 👤 Usuário

* Visualizar produtos em formato de cards
* Ver detalhes do produto (imagem, descrição e preço)
* Adicionar produtos ao carrinho
* Remover e alterar quantidade no carrinho
* Finalizar pedido com dados pessoais

### 🔐 Admin

* Login de administrador
* Cadastrar novos produtos com:

  * Nome
  * Preço
  * Imagem
  * Descrição
  * Categoria
* Editar produtos em um modal completo
* Atualizar imagem do produto
* Deletar produtos com confirmação
* Logout automático quando o token expira

---

## 🧠 Tecnologias utilizadas

### Frontend

* HTML
* CSS
* JavaScript (Vanilla)

### Backend

* Node.js
* Express
* MySQL
* Multer (upload de imagens)
* JWT (autenticação)

---

## 📂 Estrutura do Projeto

backend/

* controllers/
* routes/
* middlewares/
* uploads/

frontend/

* css/
* js/
* index.html

---

## ⚙️ Como rodar o projeto

### Backend

```bash
npm install
nodemon server.js
```

### Frontend

Abra o arquivo `index.html` no navegador

---

## 💡 Objetivo do projeto

Este projeto foi desenvolvido para prática de desenvolvimento full stack, incluindo:

* Integração entre frontend e backend
* Manipulação de APIs
* Upload de arquivos
* Autenticação com token
* Manipulação de banco de dados

---

## 👨‍💻 Autor

Allysson
