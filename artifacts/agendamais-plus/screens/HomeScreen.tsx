import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function HomeScreen(ctx: Pick<AgendaController, 'bookings' | 'profileName' | 'go' | 'openTab' | 'read' | 'proceedToBooking'>) {
  const { bookings, profileName, go, openTab, read, proceedToBooking } = ctx;
      return (
        <>
          <View style={styles.homeGreeting}>
            <View style={{ flex: 1 }}>
              <AppText variant="title">Olá, {profileName.split(' ')[0]}!</AppText>
              <AppText variant="body">Como podemos ajudar com sua saúde hoje?</AppText>
            </View>
            <AudioAction text={`Olá, ${profileName}. Escolha uma das funções para continuar.`} onRead={read} compact />
          </View>
          <FeatureCard title="Agendar consulta" description="Escolha o tipo, o profissional, a data e um horário." icon="calendar-outline" onPress={proceedToBooking} onRead={read} tint />
          <FeatureCard title="Minhas consultas" description={`${bookings.filter((booking) => booking.status === 'upcoming').length} agendamento(s) neste aparelho.`} icon="clipboard-outline" onPress={() => openTab('appointments')} onRead={read} />
          <FeatureCard title="Entrar na consulta" description="Veja como funciona a consulta online." icon="videocam-outline" onPress={() => go('online')} onRead={read} />
          <FeatureCard title="Ajuda e acessibilidade" description="Ajuste a leitura e consulte instruções simples." icon="accessibility-outline" onPress={() => go('help')} onRead={read} tint />
          <ActionButton title="Ajustar acessibilidade" icon="eye-outline" kind="outline" onPress={() => go('accessibility')} />
        </>
      );
}
