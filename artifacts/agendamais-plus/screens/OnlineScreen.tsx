import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function OnlineScreen(ctx: Pick<AgendaController, 'specialty' | 'provider' | 'setSelectedBookingId' | 'inCall' | 'setInCall' | 'theme' | 'selectedBooking' | 'activeOnlineBooking' | 'go' | 'back' | 'openTab' | 'read' | 'proceedToBooking'>) {
  const { specialty, provider, setSelectedBookingId, inCall, setInCall, theme, selectedBooking, activeOnlineBooking, go, back, openTab, read, proceedToBooking } = ctx;
      const booking = selectedBooking?.type === 'online' ? selectedBooking : activeOnlineBooking;
      if (inCall) {
        return (
          <>
            <View style={[styles.callPanel, { backgroundColor: theme.muted }]}>
              <Ionicons name="videocam-off-outline" size={52} color={theme.primary} />
              <AppText variant="title" style={styles.centerText}>Consulta de demonstração</AppText>
              <AppText variant="body" style={styles.centerText}>Esta tela não inicia vídeo, áudio ou contato com um profissional.</AppText>
              <View style={styles.callControls}>
                <View style={[styles.callControl, { backgroundColor: theme.card }]}><Ionicons name="videocam-off-outline" size={26} color={theme.primary} /><AppText variant="caption">Vídeo desligado</AppText></View>
                <View style={[styles.callControl, { backgroundColor: theme.card }]}><Ionicons name="mic-off-outline" size={26} color={theme.primary} /><AppText variant="caption">Áudio desligado</AppText></View>
              </View>
            </View>
            <DemoNotice onRead={read}>Videochamada ilustrativa. Nenhum microfone ou câmera foi ativado.</DemoNotice>
            <ActionButton title="Encerrar demonstração" icon="call-outline" kind="danger" onPress={() => setInCall(false)} />
            <ActionButton title="Voltar às consultas" icon="arrow-back" kind="outline" onPress={() => { setInCall(false); openTab('appointments'); }} />
          </>
        );
      }
      if (!booking) {
        return (
          <>
            <EmptyState title="Nenhuma consulta online de exemplo" description="Conclua um agendamento fictício online para ver este resumo." icon="videocam-outline" />
            <DemoNotice onRead={read}>A entrada não conecta a uma videochamada real.</DemoNotice>
            <ActionButton title="Agendar uma consulta de exemplo" icon="calendar-outline" onPress={proceedToBooking} />
            <ActionButton title="Ver minhas consultas" icon="clipboard-outline" kind="outline" onPress={() => openTab('appointments')} />
          </>
        );
      }
      if (booking.type !== 'online') {
        return (
          <>
            <InfoCard title="Agendamento selecionado" value="Este exemplo está marcado como presencial." icon="location-outline" onRead={read} />
            <DemoNotice onRead={read}>Nenhuma chamada está disponível nesta demonstração.</DemoNotice>
            <ActionButton title="Ver detalhes do agendamento" icon="chevron-forward" onPress={() => { setSelectedBookingId(booking.id); go('appointment-detail'); }} />
          </>
        );
      }
      return (
        <>
          <DemoNotice onRead={read}>A consulta e o profissional são fictícios. Este botão não inicia uma chamada real.</DemoNotice>
          <InfoCard title="Profissional" value={booking.provider} icon="person-outline" onRead={read} />
          <InfoCard title="Especialidade" value={booking.specialty} icon="medical-outline" onRead={read} />
          <InfoCard title="Data e horário" value={`${formatDay(booking.day)} · ${booking.time}`} icon="calendar-outline" onRead={read} />
          <ActionButton title="Entrar na consulta" icon="videocam-outline" onPress={() => setInCall(true)} />
          <AppText variant="caption" style={styles.centerText}>A chamada de vídeo é somente demonstrativa.</AppText>
          <ActionButton title="Voltar às consultas" icon="arrow-back" kind="outline" onPress={() => openTab('appointments')} />
        </>
      );
}
