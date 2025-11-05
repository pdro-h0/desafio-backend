<h1 align="center"> Teste Técnico  Desenvolvedor Fullstack </h1>

<br>

## Diagrama da Arquitetura
<p align="center">
  <img alt="Teste Técnico" src=".github/arch-diagram.png" width="100%">
</p>

---

## Modelo de Dados
<p align="center">
  <img alt="Teste Técnico" src=".github/model.drawio.png" width="100%">
</p>

---

## Estrutura de Componentes(Frontend)

```
src/
 ├─ app/
 │   ├─ (public)/             → página pública (intenção de participação)
 │   │   ├─ components/       → componentes reutilizaveis que podem ser usados apenas em (public)
 │   │   └─ page.tsx          → página inicial
 │   │   └─ any-folder/      → componentes não reutilizaveis que podem ser usados apenas em (public)
 |   |
 │   ├─ admin/                → área administrativa protegida
 │   │   ├─ components/       → componentes reutilizaveis que podem ser usados apenas em (admin)
 │   │   └─ page.tsx          → página inicial
 │   │   └─ layout.tsx        → layout base para admin
 │   │   └─ any-folder/       → componentes não reutilizaveis que podem ser usados apenas em (admin)
 |
 │   ├─ members/              → página privada de membros
 │   │   ├─ components/       → componentes reutilizaveis que podem ser usados apenas em (members)
 │   │   └─ page.tsx          → página inicial
 │   │   └─ layout.tsx        → layout base para membros
 │   │   └─ any-folder/       → componentes não reutilizaveis que podem ser usados apenas em (members)
 │   ├─ layout.tsx            → layout base (header, footer, providers)
 │   └─ globals.css
 │
 ├─ components/
 │   ├─ ui/                   → componentes vindos do Shadcn
 │   ├─ any-component.tsx     → componentes reutilizaveis que podem ser usados em vários lugares
 │
 ├─ hooks/                    → hooks criados (useFetchIntentios, usePagination)
 │
 ├─ lib/                      → utilitários (twMerge, helpers)
```

