# Correção da refatoração — 01/11/2026

## Problema identificado

O arquivo `constants/agendaData.ts` definia quatro constantes sem exportá-las:
`initialPreferences`, `initialNotices`, `titles` e `descriptions`.
Os arquivos das 21 telas, o componente principal e o hook importam parte dessas constantes.
Isso gera erros TypeScript como `TS2459` (declarado localmente, mas não exportado).

## Correção aplicada

Adicionada a palavra-chave `export` às quatro declarações. Nenhum texto, valor, tela, comportamento ou estilo foi alterado nesta correção.

## Como validar no Windows

1. Extraia este ZIP em **uma pasta nova**, preservando a cópia original.
2. Abra a raiz `AgendaMais-Acessivel-main` no VS Code.
3. Se as dependências não estiverem instaladas, no terminal da raiz execute `pnpm.cmd install --ignore-scripts`.
4. Entre no aplicativo: `cd artifacts/agendamais-plus`.
5. Execute `pnpm.cmd exec tsc --noEmit`.

**Limitação:** a compilação completa não foi executada neste ambiente porque as dependências npm não estavam disponíveis e o acesso ao registro npm falhou. Portanto, o resultado de zero erros não está confirmado. Envie o texto dos erros restantes caso o comando ainda reporte problemas.

## Observações

- A pasta `agendamais-plus-ds` é outro pacote do monorepositório, não a pasta principal do aplicativo.
- Não mova os arquivos de configuração da raiz nem copie `node_modules` do projeto antigo.
- Esta correção é sobre exports ausentes; não comprova testes de execução do Expo em dispositivo.
