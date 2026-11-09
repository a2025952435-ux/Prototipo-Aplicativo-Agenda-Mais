import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function AppointmentDetailScreen(ctx: Pick<AgendaController, 'specialty' | 'provider' | 'setInCall' | 'cancelPrompt' | 'setCancelPrompt' | 'selectedBooking' | 'go' | 'back' | 'openTab' | 'read' | 'beginReschedule' | 'cancelBooking'>) {
  const { specialty, provider, setInCall, cancelPrompt, setCancelPrompt, selectedBooking, go, back, openTab, read, beginReschedule, cancelBooking } = ctx;
      if (!selectedBooking) {
        return (
          <>
            <EmptyState title="Selecione um agendamento" description="Volte para Minhas consultas para escolher um registro." icon="calendar-outline" />
            <ActionButton title="Ver minhas consultas" icon="arrow-back" kind="outline" onPress={() => openTab('appointments')} />
          </>
        );
      }
      return (
        <>
          <StatusText status={selectedBooking.status} />
          <InfoCard title="Profissional" value={selectedBooking.provider} icon="person-outline" onRead={read} />
          <InfoCard title="Especialidade" value={selectedBooking.specialty} icon="medical-outline" onRead={read} />
          <InfoCard title="Tipo" value={visitLabel(selectedBooking.type)} icon={selectedBooking.type === 'online' ? 'videocam-outline' : 'location-outline'} onRead={read} />
          <InfoCard title="Data e horário" value={`${formatDay(selectedBooking.day)} · ${selectedBooking.time}`} icon="calendar-outline" onRead={read} />
          {selectedBooking.status === 'upcoming' && selectedBooking.type === 'online' ? (
            <ActionButton title="Entrar na consulta" icon="videocam-outline" onPress={() => { setInCall(false); go('online'); }} />
          ) : null}
          {selectedBooking.status === 'upcoming' ? (
            <ActionButton title="Voltar e reagendar" icon="create-outline" kind="secondary" onPress={() => beginReschedule(selectedBooking)} />
          ) : null}
          {selectedBooking.status === 'upcoming' && !cancelPrompt ? (
            <ActionButton title="Cancelar exemplo" icon="close-circle-outline" kind="outline" onPress={() => setCancelPrompt(true)} />
          ) : null}
          {selectedBooking.status === 'upcoming' && cancelPrompt ? (
            <DemoNotice tone="warning" onRead={read}>Deseja marcar este registro fictício como cancelado?</DemoNotice>
          ) : null}
          {cancelPrompt ? (
            <>
              <ActionButton title="Sim, cancelar exemplo" icon="checkmark" kind="danger" onPress={cancelBooking} />
              <ActionButton title="Manter agendamento" icon="arrow-back" kind="outline" onPress={() => setCancelPrompt(false)} />
            </>
          ) : null}
          <ActionButton title="Voltar às consultas" icon="arrow-back" kind="outline" onPress={() => openTab('appointments')} />
        </>
      );
}
