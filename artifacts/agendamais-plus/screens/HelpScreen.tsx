import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function HelpScreen(ctx: Pick<AgendaController, 'go' | 'openTab' | 'read'>) {
  const { go, openTab, read } = ctx;
      return (
        <>
          <DemoNotice onRead={read}>Esta ajuda ensina a navegar na demonstração. Não substitui orientação de saúde.</DemoNotice>
          <InfoCard title="Como agendar" value="Toque em Agendar consulta, escolha um tipo, uma especialidade, um profissional fictício e uma data e horário de exemplo." icon="calendar-outline" onRead={read} />
          <InfoCard title="Como ver seus registros" value="Abra Minhas consultas para revisar, reagendar ou cancelar exemplos." icon="clipboard-outline" onRead={read} />
          <InfoCard title="Como usar a leitura" value="Toque em Ouvir explicação. Uma faixa mostrará o texto simulado. Toque em Interromper para fechá-la." icon="volume-high-outline" onRead={read} />
          <InfoCard title="Precisa de ajuda agora?" value="Este protótipo não tem atendimento humano ou serviço de suporte conectado." icon="help-circle-outline" onRead={read} />
          <ActionButton title="Abrir acessibilidade" icon="accessibility-outline" onPress={() => go('accessibility')} />
          <ActionButton title="Voltar ao início" icon="home-outline" kind="outline" onPress={() => openTab('home')} />
        </>
      );
}
