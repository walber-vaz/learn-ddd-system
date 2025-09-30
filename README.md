# Modelagem de Domínio - Sistema EAD

> 🎓 Projeto de estudos sobre arquitetura de software com foco em DDD (Domain-Driven Design), Arquitetura Hexagonal e Clean Architecture.

## 📋 Sobre o Projeto

Este é um projeto de estudos para explorar e aplicar conceitos avançados de arquitetura de software, com foco na modelagem de domínio para um sistema de Educação a Distância (EAD). O projeto implementa padrões e práticas modernas de desenvolvimento, priorizando a separação de responsabilidades e a independência de frameworks.

## 🏗️ Arquitetura

O projeto segue os princípios de:

- **Domain-Driven Design (DDD)**: Modelagem rica do domínio com Value Objects, Entities e validações de negócio
- **Arquitetura Hexagonal**: Separação clara entre domínio, aplicação e infraestrutura (em desenvolvimento)
- **Clean Architecture**: Dependências apontando para o domínio, mantendo o núcleo independente de detalhes externos

### Estrutura do Projeto

```
src/
├── constants/       # Constantes da aplicação (códigos de erro, etc.)
├── error/           # Classes de erro customizadas
├── shared/          # Objetos compartilhados do domínio
│   ├── entity.ts          # Classe base para entidades
│   ├── id.ts              # Value Object para identificadores únicos
│   ├── name-person.ts     # Value Object para nomes de pessoa
│   ├── email.ts           # Value Object para e-mails
│   └── strong-password.ts # Value Object para senhas fortes
├── user/            # Contexto de usuário
│   └── user.ts            # Entidade User
└── utils/           # Utilitários e helpers
    └── validator.ts       # Sistema de validação
```

## 🎯 Conceitos Implementados

### Value Objects

Objetos imutáveis que representam conceitos do domínio:

- **Id**: Identificador único baseado em UUID v7
- **NamePerson**: Nome completo com validações (mínimo, máximo, caracteres permitidos)
- **Email**: Endereço de e-mail com validação de formato e métodos para extrair username/domain
- **StrongPassword**: Senha forte (mínimo 8 caracteres, letras maiúsculas, minúsculas, números e símbolos)

### Entities

- **Entity**: Classe base abstrata que fornece identidade única e métodos de comparação
- **User**: Entidade que representa um usuário do sistema, agregando Value Objects

### Validação

Sistema de validação flexível que:

- Valida múltiplas regras simultaneamente
- Retorna erros estruturados com códigos específicos
- Suporta validações de: not null, not empty, tamanho mínimo/máximo, regex

## 🛠️ Tecnologias

- **TypeScript**: Linguagem principal
- **Vitest**: Framework de testes
- **Biome**: Linter e formatter
- **UUID**: Geração de identificadores únicos
- **Argon2**: Hash de senhas (preparado para uso futuro)

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Executa em modo watch com tsx

# Build
npm run build            # Compila o projeto TypeScript

# Testes
npm test                 # Executa os testes
npm run test:watch       # Executa os testes em modo watch
npm run test:coverage    # Gera relatório de cobertura

# Qualidade de Código
npm run lint             # Verifica o código com Biome
npm run lint:fix         # Formata o código automaticamente
```

## 📝 Exemplos de Uso

### Criando um Usuário

```typescript
import { User } from '@/user/user';

const user = new User({
  name: 'João Silva',
  email: 'joao.silva@example.com',
  password: 'SenhaForte@123'
});

console.log(user.name.firstName); // 'João'
console.log(user.email.domain); // 'example.com'
console.log(user.id.value); // UUID gerado automaticamente
```

### Validação Automática

```typescript
// Lança ErrorValidation se o email for inválido
const user = new User({
  name: 'Maria Santos',
  email: 'email-invalido',
  password: 'SenhaForte@123'
});
// ❌ Erro: INVALID_EMAIL
```

## 🎓 Objetivo Educacional

Este projeto é desenvolvido com propósito de aprendizado e exploração de:

- Modelagem rica de domínio
- Validações de negócio no domínio
- Imutabilidade e Value Objects
- Testes unitários de domínio
- Padrões de arquitetura escalável
- TypeScript avançado

## 📄 Licença

[MIT](LICENSE)

---

**Status**: 🚧 Em desenvolvimento ativo
