---
slug: ide-configuration
title: 我的 IDE 配置
date: 2022-07-21
authors: keqing
tags: [ide, profile]
keywords: [ide, profile]
description: ide 配置
---

工欲善其事, 必先利其器, 配置 ide 才能让它更智能

<!-- truncate -->

## VS Code

### setting.json

```json
{
  // Visuals
  "workbench.iconTheme": "file-icons",
  "workbench.colorTheme": "Vitesse Light",
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "git.autofetch": true,
  "git.confirmSync": false,
  "git.suggestSmartCommit": true,
  "git.enableSmartCommit": true,
  "git.untrackedChanges": "separate",

  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.simpleDialog.enable": true,

  "typescript.updateImportsOnFileMove.enabled": "always",
  "reactSnippets.settings.prettierEnabled": true,

  // Editor
  "editor.fontSize": 13,
  "editor.fontFamily": "Input Mono, JetBrains Mono, monospace",
  "editor.fontLigatures": true,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.tokenColorCustomizations": {
    "comments": "#1fd160"
  },
  "editor.accessibilitySupport": "off",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.find.addExtraSpaceOnTop": false,
  "editor.guides.bracketPairs": "active",
  "editor.inlineSuggest.enabled": true,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.renderWhitespace": "boundary",
  "editor.suggestSelection": "first",
  "editor.tabSize": 2,
  "editor.unicodeHighlight.invisibleCharacters": false,
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true, // this allows ESLint to auto fix on save
    "source.organizeImports": false
  },

  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,

  "terminal.integrated.fontFamily": "MesloLGM NF",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.fontWeight": "300",
  "terminal.integrated.persistentSessionReviveProcess": "never",
  "terminal.integrated.tabs.enabled": true,

  "search.exclude": {
    "**/.git": true,
    "**/.github": true,
    "**/.nuxt": true,
    "**/.output": true,
    "**/.pnpm": true,
    "**/.vscode": true,
    "**/.yarn": true,
    "**/bower_components": true,
    "**/dist/**": true,
    "**/logs": true,
    "**/node_modules": true,
    "**/out/**": true,
    "**/package-lock.json": true,
    "**/pnpm-lock.yaml": true,
    "**/tmp": true,
    "**/yarn.lock": true
  },

  // Extension configs
  "emmet.showSuggestionsAsSnippets": true,
  "emmet.triggerExpansionOnTab": false,
  "errorLens.enabledDiagnosticLevels": ["warning", "error"],
  "errorLens.excludeBySource": ["cSpell", "Grammarly", "eslint"]
}
```

### global.code-snippets

````json
{
  "import": {
    "scope": "javascript,typescript",
    "prefix": "im",
    "body": ["import { $1 } from '$2';"],
    "description": "Import a module"
  },
  "export-all": {
    "scope": "javascript,typescript",
    "prefix": "ex",
    "body": ["export * from '$2';"],
    "description": "Export a module"
  },
  "vue-script-setup": {
    "scope": "vue",
    "prefix": "<sc",
    "body": [
      "<script setup lang=\"ts\">",
      "const props = defineProps<{",
      "  modelValue?: boolean,",
      "}>()",
      "$1",
      "</script>",
      "",
      "<template>",
      "  <div>",
      "    <slot/>",
      "  </div>",
      "</template>"
    ]
  },
  "vue-template-ref": {
    "scope": "javascript,typescript,vue",
    "prefix": "tref",
    "body": ["const ${1:el} = shallowRef<HTMLDivElement>()"]
  },
  "vue-computed": {
    "scope": "javascript,typescript,vue",
    "prefix": "com",
    "body": ["computed(() => { $1 })"]
  },
  "vue-watch-effect": {
    "scope": "javascript,typescript,vue",
    "prefix": "watchE",
    "body": ["watchEffect(() => {", "  $1", "})"]
  },
  "if-vitest": {
    "scope": "javascript,typescript",
    "prefix": "ifv",
    "body": [
      "if (import.meta.vitest) {",
      "  const { describe, it, expect } = import.meta.vitest",
      "  ${1}",
      "}"
    ]
  },
  "markdown-api-table": {
    "scope": "markdown",
    "prefix": "table",
    "body": [
      "<table>",
      "<tr>",
      "<td width=\"400px\" valign=\"top\">",
      "",
      "### API",
      "",
      "Description",
      "",
      "</td>",
      "<td width=\"600px\"><br>",
      "",
      "```ts",
      "// code block",
      "```",
      "",
      "</td>",
      "</tr>",
      "</table>"
    ]
  }
}
````

### plugins

#### git

- git lens
- git graph
- git history

#### snippets

- volar
- ES7+ React/Redux/React-Native snippets
- UnoCSS

#### preview

> 增强文件预览

- Svg Preview
- Image Preview
- MDX

#### debug

> 主要是调试相关

- Import Cost
- Error Lens

#### beauty

> 这里包含 字体, 主题, icon 配置

- file icons / vscode icons
- vitesse theme / atom theme
- Jetbrain Mono / Input Mono

## Webstorm

## intelliJ Idea
