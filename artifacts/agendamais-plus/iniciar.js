
const readline = require("node:readline");
const { spawn } = require("node:child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

function perguntar(mensagem) {
  return new Promise((resolve) => {
    rl.question(mensagem, resolve);
  });
}

function limparTela() {
  console.clear();
}

function cabecalho(titulo) {
  console.log("==========================================");
  console.log(`          ${titulo}`);
  console.log("==========================================\n");
}

function iniciarExpo() {
  console.log("\nIniciando o AgendaMais+...");
  console.log("Aguarde o Expo carregar.");
  console.log("Depois pressione W para abrir no navegador.\n");

  rl.close();

  const windows = process.platform === "win32";

  const processo = spawn(
    windows ? "pnpm.cmd" : "pnpm",
    ["exec", "expo", "start", "--clear"],
    {
      cwd: __dirname,
      stdio: "inherit",
      shell: windows
    }
  );

  processo.on("error", (erro) => {
    console.error("Erro ao iniciar o Expo:", erro.message);
  });

  processo.on("exit", (codigo) => {
    if (codigo !== 0 && codigo !== null) {
      console.log(`O Expo terminou com o código ${codigo}.`);
    }
  });
}

async function sobreProjeto() {
  limparTela();
  cabecalho("SOBRE O AGENDAMAIS+");

  console.log("Projeto acadêmico de Desenvolvimento de Sistemas.\n");
  console.log("Objetivo:");
  console.log("Facilitar o agendamento de consultas médicas,");
  console.log("com foco na acessibilidade de pessoas idosas.\n");

  console.log("Tecnologias utilizadas:");
  console.log("- React Native");
  console.log("- Expo");
  console.log("- TypeScript");
  console.log("- Node.js\n");

  console.log("==========================================\n");

  await perguntar("Pressione ENTER para voltar ao menu...");
}

async function menuPrincipal() {
  while (true) {
    limparTela();
    cabecalho("AGENDAMAIS+");

    console.log("       SEJA BEM-VINDO AO SISTEMA!\n");
    console.log("Sistema de agendamento de consultas");
    console.log("com foco em acessibilidade.\n");

    console.log("------------------------------------------");
    console.log("[1] Iniciar aplicativo");
    console.log("[2] Sobre o projeto");
    console.log("[3] Sair");
    console.log("------------------------------------------\n");

    const opcao = (await perguntar("Digite sua opção: ")).trim();

    if (opcao === "1") {
      iniciarExpo();
      return;
    }

    if (opcao === "2") {
      await sobreProjeto();
      continue;
    }

    if (opcao === "3") {
      console.log("\nEncerrando o AgendaMais+. Até logo!");
      rl.close();
      return;
    }

    console.log("\nOpção inválida.");
    await perguntar("Pressione ENTER para tentar novamente...");
  }
}

menuPrincipal().catch((erro) => {
  console.error("Erro no menu:", erro);
  rl.close();
});
