

Este projeto implementa o CRUD de um Recurso Principal e um Sub-Recurso relacionado, utilizando Vue.js 3 e uma API simulada com json-server.

## ⚙️ Pré-requisitos

* Node.js (versão LTS recomendada)
* json-server (para simular a API)

## 📦 Como Instalar e Rodar

### 1. Inicializar o Backend (API Simulada)

1.  Navegue até a pasta `backend/`:
    ```bash
    cd backend
    ```
2.  Instale o json-server globalmente (se ainda não tiver):
    ```bash
    npm install -g json-server
    ```
3.  Inicie o servidor na porta 3000 (conforme configurado em `frontend/.env`):
    ```bash
    json-server --watch db.json --port 3000
    ```
    O servidor estará rodando em `http://localhost:3000` a configuração padrão está em uma poorta de workspace MUDE.

### 2. Inicializar o Frontend

1.  Volte a raiz do projeto `/`
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o aplicativo Vue.js:
    ```bash
    npm run dev
    ```
    O frontend estará acessível em `http://localhost:<porta_vite>`.

## ✨ Boas Práticas Implementadas

* **Separação de Responsabilidades (Camada `services/`):** A comunicação com a API (Axios) é isolada em `resourceService.js` e `subresourceService.js`.
* **Reaproveitamento de Formulário:** O componente `ResourceForm.vue` é usado tanto para criar quanto para editar, com o comportamento definido pela **prop `model`**:
    * Se `model` é **`null`** (ou `undefined`): **Modo Criação**.
    * Se `model` é um **objeto** (`{ id: 1, ... }`): **Modo Edição**. O formulário carrega os dados do objeto.
* **Variáveis de Ambiente:** A URL da API é configurada via `.env` (`VITE_API_URL`).
* **Filtros:** O componente `ResourceFilters.vue` (a ser implementado) envia filtros para o método `resourceService.getAll()`.

## 📌 Requisitos Adicionais (Checklist)

* **Filtros:** (Implementar pelo menos 2)
    * [X] Pesquisa por texto (`titulo_like`)
    * [X] Filtro por status
* **Mensagens/Estados:** (Implementar pelo menos 3)
    * [X] Validação de formulário (`ResourceForm.vue`)
    * [X] Confirmação antes de deletar (`App.vue`)
    * [X] Mensagem de lista vazia (`ResourceList.vue`)
