import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function AboutScreen(ctx: Pick<AgendaController, 'openTab' | 'read'>) {
  const { openTab, read } = ctx;
      return (
        <>
          <View style={styles.centerBlock}>
            <BrandLogo size={86} />
            <AppText variant="title" style={styles.centerText}>Cuidar da saúde com mais autonomia</AppText>
            <AppText variant="body" style={styles.centerText}>
              Um protótipo acadêmico de consultas online, pensado para facilitar a navegação de pessoas idosas.
            </AppText>
          </View>
          <InfoCard title="Versão" value="Demonstração acadêmica AgendaMais+" icon="information-circle-outline" onRead={read} />
          <DemoNotice onRead={read}>Não oferece atendimento de saúde, consulta médica, vídeo, disponibilidade real ou leitura de voz.</DemoNotice>
          <ActionButton title="Voltar ao início" icon="home-outline" onPress={() => openTab('home')} />
        </>
      );
}
