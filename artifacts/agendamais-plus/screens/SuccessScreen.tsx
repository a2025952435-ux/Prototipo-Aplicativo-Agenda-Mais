import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function SuccessScreen(ctx: Pick<AgendaController, 'bookings' | 'provider' | 'selectedBookingId' | 'theme' | 'openTab' | 'read'>) {
  const { bookings, provider, selectedBookingId, theme, openTab, read } = ctx;
      const booked = bookings.find((item) => item.id === selectedBookingId);
      return (
        <>
          <View style={[styles.successMark, { backgroundColor: theme.primary }]}>
            <Ionicons name="checkmark" size={58} color={theme.primaryForeground} />
          </View>
          <AppText variant="title" style={styles.centerText}>Sua consulta foi agendada!</AppText>
          <AppText variant="body" style={styles.centerText}>O agendamento foi salvo neste dispositivo.</AppText>
          {booked ? (
            <View style={styles.summaryCard}>
              <InfoCard title="Profissional" value={booked.provider} icon="person-outline" onRead={read} />
              <InfoCard title="Tipo de consulta" value={visitLabel(booked.type)} icon={booked.type === 'online' ? 'videocam-outline' : 'location-outline'} onRead={read} />
              <InfoCard title="Data" value={formatDay(booked.day)} icon="calendar-outline" onRead={read} />
              <InfoCard title="Horário" value={booked.time} icon="time-outline" onRead={read} />
            </View>
          ) : null}
          <ActionButton title="Voltar ao início" icon="home-outline" onPress={() => openTab('home')} />
          <ActionButton title="Visualizar consultas" icon="clipboard-outline" kind="secondary" onPress={() => openTab('appointments')} />
        </>
      );
}
