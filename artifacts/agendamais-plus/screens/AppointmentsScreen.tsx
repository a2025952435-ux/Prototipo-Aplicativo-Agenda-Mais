import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function AppointmentsScreen(ctx: Pick<AgendaController, 'bookings' | 'specialty' | 'provider' | 'setSelectedBookingId' | 'setInCall' | 'theme' | 'go' | 'read' | 'proceedToBooking'>) {
  const { bookings, specialty, provider, setSelectedBookingId, setInCall, theme, go, read, proceedToBooking } = ctx;
      return (
        <>
          <DemoNotice onRead={read}>Os agendamentos ficam salvos neste aparelho e não são enviados a clínicas.</DemoNotice>
          <SectionHeading title="Próximos agendamentos" read={read} />
          {bookings.length === 0 ? (
            <EmptyState title="Nenhum agendamento" description="Quando você concluir o fluxo, ele aparecerá aqui." icon="calendar-outline" />
          ) : (
            bookings.map((booking) => (
              <View key={booking.id} style={[styles.bookingCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={styles.bookingHeading}>
                  <View style={[styles.featureIcon, { backgroundColor: theme.secondary }]}>
                    <Ionicons name={booking.type === 'online' ? 'videocam-outline' : 'location-outline'} size={25} color={theme.primary} />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <AppText variant="section">{booking.specialty}</AppText>
                    <AppText variant="body">{booking.provider}</AppText>
                  </View>
                  <AudioAction text={`${booking.specialty}. ${booking.provider}. ${visitLabel(booking.type)}. ${formatDay(booking.day)}, às ${booking.time}.`} onRead={read} compact />
                </View>
                <StatusText status={booking.status} />
                <AppText variant="body">{formatDay(booking.day)} · {booking.time}</AppText>
                <ActionButton title="Ver detalhes" icon="chevron-forward" kind="secondary" onPress={() => { setSelectedBookingId(booking.id); go('appointment-detail'); }} />
                {booking.status === 'upcoming' && booking.type === 'online' ? (
                  <ActionButton title="Entrar na consulta" icon="videocam-outline" onPress={() => { setSelectedBookingId(booking.id); setInCall(false); go('online'); }} />
                ) : null}
              </View>
            ))
          )}
          <ActionButton title="Agendar consulta" icon="add" kind="outline" onPress={proceedToBooking} />
        </>
      );
}
