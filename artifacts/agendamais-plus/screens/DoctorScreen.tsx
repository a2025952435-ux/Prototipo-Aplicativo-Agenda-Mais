import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function DoctorScreen(ctx: Pick<AgendaController, 'visitType' | 'specialty' | 'provider' | 'theme' | 'go' | 'back' | 'read'>) {
  const { visitType, specialty, provider, theme, go, back, read } = ctx;
      return (
        <>
          <View style={styles.profileHero}>
            <View style={[styles.avatar, styles.avatarLarge, { backgroundColor: theme.secondary }]}>
              <Ionicons name="person-outline" size={42} color={theme.primary} />
            </View>
            <AppText variant="title" style={styles.centerText}>{provider}</AppText>
            <AppText variant="body" style={styles.centerText}>{specialty}</AppText>
            <AudioAction text={`Perfil de ${provider}, da especialidade ${specialty}. Os dados são fictícios.`} onRead={read} />
          </View>
          <InfoCard title="Sobre este perfil" value="Informações ilustrativas para a apresentação acadêmica." icon="information-circle-outline" onRead={read} />
          <InfoCard title="Atendimento" value={visitLabel(visitType)} icon={visitType === 'online' ? 'videocam-outline' : 'location-outline'} onRead={read} />
          <DemoNotice onRead={read}>Não há cadastro profissional, clínica ou disponibilidade real.</DemoNotice>
          <ActionButton title="Ver horários de exemplo" icon="time-outline" onPress={() => go('schedule')} />
          <ActionButton title="Escolher outro profissional" icon="arrow-back" kind="outline" onPress={() => go('doctors')} />
        </>
      );
}
