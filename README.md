# Aplicação Front-end - Teste Técnico

Projeto desenvolvido como parte do teste técnico para a vaga de Desenvolvedor Front-end. A aplicação consiste em um sistema de autenticação, gerenciamento de estado com Redux, consumo de API com React Query e uma interface detalhada e responsiva utilizando Ant Design e Styled-components.

## Tecnologias Utilizadas

ReactJS com react-hook-form para validação de inputs

Ant Design para estilização e componentes visuais

Styled-components para estilos personalizados e componentização

Redux para gerenciamento global de estados

React Query para consumo eficiente e otimizado de APIs

Vitest para testes unitários e de integração

## Instalação

git clone https://github.com/paolakossa/teste-processo-seletivo.git
cd seu-projeto
npm install

## Rodando o Projeto

Para iniciar a aplicação em modo de desenvolvimento, execute:

npm run dev

## Rodando Testes

Para rodar todos os testes:

npm run test

Para verificar a cobertura dos testes, utilize:

npm run test:coverage

## Funcionalidades Implementadas

Autenticação e validação de login com react-hook-form

Persistência e gerenciamento de estado global utilizando Redux

Consumo da API externa com React Query

Interface estilizada conforme design pixel-perfect fornecido pelo Figma

Listagem paginada e organizada de usuários

Proteção de rotas baseada em autenticação

## Autenticação

As rotas protegidas exigem que o usuário esteja autenticado.

Dados do usuário, incluindo email e token, são armazenados e persistidos no Redux.

## Boas Práticas de Segurança

Validação robusta dos campos de login.

Uso adequado de tokens para autenticação segura das rotas.

## Testes

Os testes foram implementados utilizando Vitest, garantindo qualidade e integridade do código, com testes unitários e de integração.
