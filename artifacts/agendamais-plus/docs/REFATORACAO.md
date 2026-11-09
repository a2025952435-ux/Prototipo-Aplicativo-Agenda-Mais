# AgendaMais+ — documentação da reorganização

## 1. Escopo e origem

Reorganização realizada a partir do arquivo `AgendaMais-Acessivel-main (1).zip`, exportado do GitHub. O aplicativo é um **protótipo acadêmico**, não um serviço de saúde. A reorganização preserva o fluxo demonstrativo, os textos, as cores e os componentes visuais existentes no código original. Não foram implementados cadastro real, agendamento real, chamada de vídeo ou reprodução de áudio.

## 2. Organização entregue

| Local | Responsabilidade |
| --- | --- |
| `app/` | Entrada e layout do Expo Router; preservados. |
| `components/AgendaMaisApp.tsx` | Composição geral, abertura, cabeçalho, navegação inferior e indicador de leitura demonstrativa. |
| `components/AgendaMaisUI.tsx` | Biblioteca de componentes visuais existente; preservada. |
| `components/common/AgendaScreenParts.tsx` | Peças compartilhadas entre telas (etiquetas, opções, títulos, cartões e switches). |
| `screens/*Screen.tsx` | **21 telas** com conteúdo visual independente. |
| `hooks/useAgendaController.ts` | Estado, navegação, validações de formulários, operações de agendamento e persistência local. |
| `types/agenda.ts` | Tipos de tela, consulta, aviso, preferências e dados da demonstração. |
| `constants/agendaData.ts` | Constantes, textos, títulos e dados de exemplo. |
| `utils/agendaHelpers.ts` | Formatação, geração de datas e validação de dados armazenados. |
| `styles/agendaStyles.ts` | Estilos compartilhados, preservados do componente original. |

O arquivo `AgendaMaisApp.tsx` passou de **1.298 para aproximadamente 238 linhas**. Os conteúdos das telas foram movidos sem redesenhar as interfaces. As telas continuam recebendo as ações e os dados do controlador por propriedades tipadas (`Pick<AgendaController, ...>`). A estrutura `artifacts/agendamais-plus` foi mantida para respeitar o workspace original; não é necessário criar uma pasta `src` adicional.

## 3. Telas separadas

Abertura permanece no componente principal. Foram extraídas as telas: Welcome, Login, Register, Recovery, Accessibility, Home, Specialty, Doctors, Doctor, Schedule, Confirmation, Success, Appointments, AppointmentDetail, Online, Notifications, Profile, EditProfile, Settings, Help e About.

## 4. Funcionamento e limites

- Login e cadastro são demonstrações locais; não há autenticação de verdade.
- Agendamentos e preferências são armazenados no dispositivo por `AsyncStorage`.
- Os profissionais e horários são exemplos; não representam disponibilidade real.
- O botão de áudio simula visualmente a leitura, mas não reproduz voz.
- A navegação entre telas usa o estado do controlador, não novas rotas do Expo Router; esse comportamento foi preservado para evitar regressões.

## 5. Verificações realizadas

- Leitura de todos os arquivos TypeScript/TSX do aplicativo pelo parser TypeScript: **nenhum erro de sintaxe encontrado**.
- Verificação dos caminhos locais `@/` usados nos imports: **nenhum arquivo de destino ausente**.
- Conferência da presença de **21 arquivos de tela** e redução do componente principal.

**Limitação importante:** não foi possível executar `pnpm typecheck`, iniciar o Expo ou testar as telas em um aparelho neste ambiente, porque as dependências (`node_modules`) não vieram no ZIP e o gerenciador de pacotes não estava disponível. A verificação de sintaxe **não substitui** a checagem de tipos nem o teste funcional. Portanto, não é possível garantir compilação ou funcionamento integral antes desses testes.

## 6. Como validar no seu computador

**Faça em uma cópia do projeto original.** Não sobrescreva o projeto que funciona até validar.

No terminal, na raiz do projeto:

```powershell
corepack pnpm install
corepack pnpm --dir artifacts/agendamais-plus typecheck
```

Para iniciar o aplicativo, utilize o comando de desenvolvimento que você já usa no seu ambiente Expo/Replit. Teste: abertura, login fictício, cadastro fictício, acessibilidade, escolha de especialidade, escolha de profissional, agendamento, remarcação, cancelamento, notificações, perfil e configurações.

Se o seu ambiente não tiver `corepack`, use a instalação de `pnpm` que já funciona nele. O comando de desenvolvimento no `package.json` usa variáveis de ambiente específicas do Replit e pode exigir adaptação fora dele.

## 7. Arquivos preservados

Os arquivos de configuração, a biblioteca visual, os recursos, o servidor, o design system e as demais partes do repositório foram mantidos. A refatoração não altera dependências, nem reescreve a experiência do usuário.

## 8. Melhorias futuras (não implementadas)

A extração do controlador para hooks menores, a criação de testes automatizados de fluxo e a integração com backend real são possíveis evoluções, mas **não fazem parte desta reorganização**. Uma integração médica real exige cuidados adicionais com segurança, privacidade e validação.
