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
    title: 'Boas-vindas',
    body: 'Confira seus avisos e lembretes neste espaço.',
    date: 'Aviso local',
    read: false,
  },
  {
    id: 'demo-reminder',
    title: 'Lembrete',
    body: 'Seus lembretes aparecerão aqui.',
    date: 'Exemplo',
    read: true,
  },
];
export const titles: Record<ScreenId, string> = {
  opening: 'Abertura',
  welcome: 'Boas-vindas',
  login: 'Entrar',
  register: 'Criar cadastro',
  recovery: 'Recuperar acesso',
  accessibility: 'Acessibilidade inicial',
  home: 'Início',
  specialty: 'Tipo e especialidade',
  doctors: 'Profissionais',
  doctor: 'Perfil do profissional',
  schedule: 'Data e horário',
  confirmation: 'Confirmar agendamento',
  success: 'Agendamento confirmado',
  appointments: 'Minhas consultas',
  'appointment-detail': 'Detalhes da consulta',
  online: 'Consulta online',
  notifications: 'Notificações e lembretes',
  profile: 'Perfil do usuário',
  'edit-profile': 'Editar dados pessoais',
  settings: 'Configurações',
  help: 'Ajuda e suporte',
  about: 'Sobre o AgendaMais+',
};
export const descriptions: Partial<Record<ScreenId, string>> = {
  welcome: 'Escolha como deseja conhecer o aplicativo.',
  login: 'Acesse as funções do aplicativo. O acesso não cria uma conta online.',
  register: 'Os dados digitados não são enviados nem guardados.',
  recovery: 'Não enviamos e-mails de recuperação.',
  accessibility: 'Ajuste o texto e o contraste para facilitar a leitura.',
  specialty: 'Escolha uma modalidade e uma especialidade.',
  doctors: 'Escolha um profissional para continuar.',
  doctor: 'Conheça o perfil antes de escolher um horário.',
  schedule: 'Selecione a data e o horário desejados.',
  confirmation: 'Revise os dados antes de confirmar.',
  success: 'O registro fica salvo somente neste dispositivo.',
  appointments: 'Consulte seus agendamentos.',
  'appointment-detail': 'Veja ou altere os dados do agendamento.',
  online: 'A chamada de vídeo não está conectada.',
  notifications: 'Consulte seus avisos e lembretes locais.',
  profile: 'Consulte seus dados de perfil.',
  'edit-profile': 'As alterações permanecem somente nesta sessão.',
  settings: 'Preferências e registros ficam neste dispositivo.',
  help: 'Orientações simples para usar o aplicativo.',
  about: 'Conheça o projeto acadêmico e seus recursos de acessibilidade.',
};

