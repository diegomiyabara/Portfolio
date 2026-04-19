# Portfolio Diego Miyabara

Demo: [https://portfolio-diego-miyabaras-projects.vercel.app/](https://portfolio-diego-miyabaras-projects.vercel.app/)

## Visão geral

Este projeto é um portfólio pessoal construído com React, TypeScript e Vite. Ele foi desenvolvido para apresentar experiência profissional em e-commerce, Adobe Commerce / Magento 2 e aplicações web modernas.

A interface usa um slider de seções para navegar entre:

- Home
- Sobre
- Skills
- Projetos
- Contato

Também oferece suporte a alternância de idiomas entre português e inglês, navegação via teclado e animações suaves com framer-motion.

## Recursos

- Navegação por slider com controles e indicadores
- Autoplay com botão de pausar/continuar
- Layout responsivo para desktop e mobile
- Alternância de idioma (PT / EN)
- Projetos com cards e links de demonstração
- Seção de habilidades com ícones personalizados
- Suporte a teclado (setas esquerda/direita)

## Tecnologias usadas

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- react-i18next
- Simple Icons
- ESLint
- Vitest

## Estrutura do projeto

- src/App.tsx — aplicação principal
- src/components/Layout.tsx — layout global com navbar e estrutura de página
- src/components/SectionSlider.tsx — slider principal das seções
- src/components/Navbar.tsx — barra de navegação e toggle de idioma
- src/components/SkillsSection.tsx — lista de habilidades com ícones
- src/components/ProjectsSection.tsx — cards de projetos e informações de entrega
- src/components/ContactSection.tsx — área de contato com links e formulário
- src/config/slides.tsx — definição das seções do slider
- src/i18n — configuração de internacionalização e traduções
- src/data/techIcons.tsx — ícones das tecnologias usadas

## Como executar

### Instalar dependências

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Visualizar build local

```bash
npm run preview
```

## Scripts disponíveis

- npm run dev — inicia a aplicação em modo de desenvolvimento
- npm run build — gera a versão de produção
- npm run preview — pré-visualiza a build gerada
- npm run lint — executa ESLint
- npm run test — executa os testes com Vitest
- npm run test:watch — executa Vitest em modo watch

## Deploy

O projeto está publicado em Vercel:

[https://portfolio-diego-miyabaras-projects.vercel.app/](https://portfolio-diego-miyabaras-projects.vercel.app/)

### Passos para publicação gratuita

1. Conecte o repositório ao Vercel
2. Use npm run build como comando de build
3. Configure dist como diretório de saída
4. Faça deploy automático a cada push

## Customização

- Adicione novos projetos em src/i18n/locales/pt.json e src/i18n/locales/en.json
- Atualize os ícones em src/data/techIcons.tsx
- Modifique as seções em src/config/slides.tsx
- Ajuste o comportamento do slider em src/components/SectionSlider.tsx

---

Projeto criado para demonstrar competências em desenvolvimento front-end, animações responsivas e experiência em e-commerce.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
