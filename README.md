# 🌱 Trem Ambiental - Plataforma de Incentivo à Reciclagem

<div align="center">

![Angular](https://img.shields.io/badge/Angular-12.2-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-6.6-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-12.1-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)

Uma plataforma web moderna que incentiva a reciclagem através de um sistema de pontuação gamificado, permitindo que usuários troquem seus pontos por produtos sustentáveis.

[Funcionalidades](#-funcionalidades) •
[Arquitetura](#-arquitetura) •
[Tecnologias](#-tecnologias) •
[Instalação](#-instalação) •
[API](#-integração-com-api)

</div>

---

## 📋 Sobre o Projeto

O **Trem Ambiental** é uma aplicação web desenvolvida em Angular que promove a conscientização ambiental através da gamificação. Os usuários acumulam pontos ao realizar doações de materiais recicláveis e podem trocar esses pontos por produtos no catálogo da plataforma.

### 🎯 Objetivo

Criar um ecossistema digital que incentive práticas sustentáveis, conectando usuários engajados com a reciclagem a um sistema de recompensas tangível, promovendo assim um ciclo virtuoso de consumo consciente.

---

## ✨ Funcionalidades

### 🏪 Catálogo de Produtos
- Visualização de produtos disponíveis para troca
- Sistema de carrinho de compras
- Filtros e busca de produtos
- Detalhamento completo de cada item

### 📊 Sistema de Pontuação
- Acompanhamento em tempo real de pontos acumulados
- Visualização de saldo disponível
- Histórico detalhado de transações

### 📈 Histórico e Rastreamento
- Histórico completo de doações realizadas
- Registro de pesagens com data e hora
- Filtros por período (datas personalizadas)
- Visualização de pontos ganhos por período

### 🛒 Gestão de Pedidos
- Sistema completo de carrinho
- Histórico de pedidos realizados
- Acompanhamento de status dos pedidos
- Confirmação e finalização de compras

### 🏆 Ranking de Usuários
- Sistema de ranking mensal
- Comparação com mês anterior
- Visualização da posição no ranking
- Incentivo à competição saudável

### 👤 Gerenciamento de Perfil
- Cadastro completo de usuários
- Atualização de dados pessoais
- Sistema de autenticação seguro (JWT)
- Recuperação e alteração de senha

---

## 🏗️ Arquitetura

### Estrutura do Projeto

O projeto segue uma arquitetura modular baseada em contextos de negócio, promovendo alta coesão e baixo acoplamento:

```
src/app/
├── common/                          # Módulos compartilhados
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── card-saldo/             # Exibição de saldo
│   │   ├── menu-lateral/           # Navegação lateral
│   │   └── menu-superior/          # Barra de navegação
│   ├── services/                    # Serviços globais
│   │   ├── handle-error.service    # Tratamento centralizado de erros
│   │   ├── saldo.service           # Gerenciamento de saldo
│   │   └── rota-guard.service      # Proteção de rotas
│   ├── interfaces/                  # Contratos TypeScript
│   ├── models/                      # Modelos de dados
│   ├── enum/                        # Enumerações
│   └── scss/                        # Estilos globais
│
└── contexto/                        # Módulos de contexto de negócio
    ├── autenticacao/                # Autenticação e autorização
    │   ├── services/
    │   ├── models/
    │   └── pages/
    ├── home/                        # Dashboard principal
    │   ├── components/
    │   ├── services/
    │   └── pages/
    ├── loja/                        # Catálogo e carrinho
    │   ├── services/
    │   │   ├── prateleira.service  # Gestão de produtos
    │   │   └── pedido.service      # Gestão de pedidos
    │   └── pages/
    ├── historico/                   # Histórico de reciclagem
    │   ├── services/
    │   └── pages/
    └── cadastro/                    # Gestão de usuários
        ├── services/
        └── pages/
```

### Padrões Arquiteturais

#### 🎯 Separação por Contextos
Cada módulo de contexto (`autenticacao`, `loja`, `historico`, etc.) é independente e possui sua própria estrutura de:
- **Services**: Lógica de negócio e comunicação com API
- **Models**: Tipagem forte com TypeScript
- **Pages**: Componentes de página
- **Routes**: Configuração de rotas lazy-loaded

#### 🔄 Lazy Loading
Todos os módulos de contexto utilizam lazy loading para otimizar o carregamento inicial:
```typescript
{
  path: 'loja',
  loadChildren: () => import('./contexto/loja/modules/loja.module')
    .then(module => module.LojaModule)
}
```

#### 🛡️ Guards e Interceptors
- **RotaGuardService**: Proteção de rotas baseada em autenticação
- **AuthInterceptor**: Injeção automática de tokens JWT
- **ErroInterceptor**: Tratamento global de erros HTTP
- **CanDeactivateGuard**: Prevenção de perda de dados

#### 📡 Programação Reativa (RxJS)
Uso extensivo de Observables para:
- Requisições HTTP assíncronas
- Gerenciamento de estado
- Tratamento de erros com `catchError`
- Transformação de dados com operadores (`map`, `pipe`)

---

## 🛠️ Tecnologias

### Core
- **Angular 12.2** - Framework principal
- **TypeScript 4.2** - Superset JavaScript com tipagem estática
- **RxJS 6.6** - Programação reativa
- **Angular Router** - Gerenciamento de rotas com lazy loading

### UI/UX
- **Ng-Zorro (Ant Design) 12.1** - Biblioteca de componentes UI
- **SCSS/LESS** - Pré-processadores CSS
- **Angular Animations** - Animações fluidas

### Segurança e Autenticação
- **@auth0/angular-jwt 5.0** - Gerenciamento de tokens JWT
- **crypto-js 4.1** - Criptografia client-side

### Utilitários
- **Moment.js 2.29** - Manipulação de datas
- **ngx-mask 12.0** - Máscaras de input (CPF, telefone, etc.)

### Testes
- **Jasmine 3.7** - Framework de testes
- **Karma 6.3** - Test runner

### Build e Desenvolvimento
- **Angular CLI 12.2** - Ferramentas de desenvolvimento
- **Webpack** - Bundler (via Angular CLI)

---

### Formato de Resposta Padrão
```typescript
interface IRequestResult<T> {
  data: T;
  success: boolean;
  messages: string[];
}
```

---

## 🔐 Segurança

### Implementações de Segurança

- **JWT Authentication**: Tokens armazenados localmente e enviados automaticamente via interceptor
- **Route Guards**: Proteção de rotas sensíveis
- **Criptografia**: Dados sensíveis criptografados com crypto-js
- **HTTP Interceptors**: Tratamento centralizado de erros e autenticação
- **Validação de Formulários**: Validações client-side com Angular Forms

---

## 📱 Responsividade

A aplicação é totalmente responsiva, utilizando:
- Grid system do Ant Design
- Media queries customizadas
- Componentes adaptativos
- Mobile-first approach

---

## 🎨 Padrões de Código

### Convenções
- **Nomenclatura**: PascalCase para classes, camelCase para variáveis
- **Estrutura de arquivos**: Organização por feature/contexto
- **Tipagem**: TypeScript strict mode
- **Interfaces**: Prefixo `I` para interfaces (ex: `IRequestResult`)
- **Services**: Sufixo `.service.ts`
- **Models**: Sufixo `.model.ts`

### Boas Práticas Implementadas
- ✅ Injeção de dependências
- ✅ Programação reativa com RxJS
- ✅ Tratamento centralizado de erros
- ✅ Lazy loading de módulos
- ✅ Componentização e reutilização
- ✅ Separação de responsabilidades (SRP)
- ✅ Tipagem forte com TypeScript

---

## 📈 Performance

### Otimizações Implementadas
- **Lazy Loading**: Carregamento sob demanda de módulos
- **OnPush Change Detection**: Onde aplicável
- **Tree Shaking**: Remoção de código não utilizado
- **AOT Compilation**: Compilação ahead-of-time em produção
- **Bundle Optimization**: Configurações de build otimizadas

---

---

## 📞 Contato

Para mais informações sobre este projeto, entre em contato:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucianorodriguess/)

---
