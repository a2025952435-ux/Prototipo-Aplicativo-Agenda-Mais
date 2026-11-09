import type { ScreenId, Preferences, Notice } from '@/types/agenda';

export const STORAGE_KEY = '@agendamais-plus/demo-v1';
export const specialties = ['Clínica geral', 'Cardiologia', 'Dermatologia', 'Oftalmologia', 'Ortopedia', 'Geriatria'];
export const exampleTimes = ['09:00', '10:30', '14:00', '15:30'];
export const initialPreferences: Preferences = {
  font: 'normal',
  contrast: false,
  speed: 'normal',
  guidance: false,
  reminders: true,
  advance: '1 dia antes',
};
export const initialNotices: Notice[] = [
  {
    id: 'demo-welcome',
    title: 'Aviso de demonstração',
    body: 'Este mural mostra exemplos. Nenhuma mensagem foi enviada.',
    date: 'Exemplo local',
    read: false,
  },
  {
    id: 'demo-reminder',
    title: 'Exemplo de lembrete',
    body: 'Um lembrete ilustrativo apareceria aqui. Ele não representa uma consulta real.',
    date: 'Exemplo',
    read: true,
  },
];
export const titles: Record<ScreenId, string> = {
  opening: 'Abertura',
  welcome: 'Boas-vindas',
  login: 'Entrar',
  register: 'Criar cadastro de demonstração',
  recovery: 'Recuperar acesso',
  accessibility: 'Acessibilidade inicial',
  home: 'Início',
  specialty: 'Tipo e especialidade',
  doctors: 'Profissionais de demonstração',
  doctor: 'Perfil do profissional',
  schedule: 'Data e horário',
  confirmation: 'Confirmar agendamento',
  success: 'Agendamento confirmado',
  appointments: 'Minhas consultas',
  'appointment-detail': 'Detalhes da consulta',
  online: 'Consulta online demonstrativa',
  notifications: 'Notificações e lembretes',
  profile: 'Perfil do usuário',
  'edit-profile': 'Editar dados pessoais',
  settings: 'Configurações',
  help: 'Ajuda e suporte',
  about: 'Sobre o AgendaMais+',
};
export const descriptions: Partial<Record<ScreenId, string>> = {
  welcome: 'Escolha como deseja conhecer o aplicativo.',
  login: 'O acesso é apenas uma demonstração, sem conta real.',
  register: 'Os dados digitados não são enviados nem guardados.',
  recovery: 'Não enviamos mensagens nesta demonstração.',
  accessibility: 'Ajuste o texto e o contraste para facilitar a leitura.',
  specialty: 'Escolha uma modalidade e uma especialidade de exemplo.',
  doctors: 'Os profissionais exibidos são fictícios.',
  doctor: 'Veja os dados ilustrativos antes de escolher um horário.',
  schedule: 'Datas e horários são exemplos, não disponibilidade real.',
  confirmation: 'Revise os dados fictícios antes de confirmar.',
  success: 'O registro fica salvo somente neste dispositivo.',
  appointments: 'Consulte os agendamentos guardados nesta demonstração.',
  'appointment-detail': 'Veja ou altere o registro de demonstração.',
  online: 'A chamada de vídeo não está conectada.',
  notifications: 'Avisos locais de exemplo, sem envio externo.',
  profile: 'Este perfil não é uma conta real.',
  'edit-profile': 'As alterações permanecem somente nesta sessão.',
  settings: 'Preferências e registros fictícios ficam neste dispositivo.',
  help: 'Orientações simples para usar a demonstração.',
  about: 'Um protótipo acadêmico com foco em autonomia e acessibilidade.',
};

