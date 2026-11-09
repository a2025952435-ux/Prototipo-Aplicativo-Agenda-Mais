import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function ConfirmationScreen(ctx: Pick<AgendaController, 'visitType' | 'specialty' | 'provider' | 'selectedDate' | 'selectedTime' | 'go' | 'back' | 'read' | 'saveBooking'>) {
  const { visitType, specialty, provider, selectedDate, selectedTime, go, back, read, saveBooking } = ctx;
      return (
        <>
          <InfoCard title="Profissional" value={provider} icon="person-outline" onRead={read} />
          <InfoCard title="Especialidade" value={specialty} icon="medical-outline" onRead={read} />
          <InfoCard title="Tipo de consulta" value={visitLabel(visitType)} icon={visitType === 'online' ? 'videocam-outline' : 'location-outline'} onRead={read} />
          <InfoCard title="Data" value={selectedDate ? formatDay(selectedDate) : 'Não selecionada'} icon="calendar-outline" onRead={read} />
          <InfoCard title="Horário" value={selectedTime || 'Não selecionado'} icon="time-outline" onRead={read} />
          <DemoNotice onRead={read}>Ao confirmar, o agendamento será salvo apenas neste dispositivo. Nenhuma clínica receberá a solicitação.</DemoNotice>
          <ActionButton title="Confirmar consulta" icon="checkmark-circle-outline" onPress={saveBooking} testID="confirm-booking" />
          <ActionButton title="Voltar e alterar" icon="arrow-back" kind="outline" onPress={() => go('schedule')} />
        </>
      );
}
