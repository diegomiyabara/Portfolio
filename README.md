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

