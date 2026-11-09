import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function SpecialtyScreen(ctx: Pick<AgendaController, 'visitType' | 'setVisitType' | 'specialty' | 'setSpecialty' | 'setSearch' | 'go' | 'read'>) {
  const { visitType, setVisitType, specialty, setSpecialty, setSearch, go, read } = ctx;
      return (
        <>
          <SectionHeading title="Tipo de consulta" read={read} />
          <SelectionCard title="Consulta online" description="A videochamada ainda não está disponível." icon="videocam-outline" selected={visitType === 'online'} onPress={() => setVisitType('online')} onRead={read} />
          <SelectionCard title="Consulta presencial" description="Local de atendimento não informado." icon="location-outline" selected={visitType === 'presencial'} onPress={() => setVisitType('presencial')} onRead={read} />
          <SectionHeading title="Escolha uma especialidade" read={read} />
          <View style={styles.wrapRow}>
            {specialties.map((item) => (
              <SelectionPill key={item} label={item} selected={specialty === item} onPress={() => setSpecialty(item)} testID={`specialty-${item}`} />
            ))}
          </View>
          <ActionButton title="Ver profissionais" icon="arrow-forward" onPress={() => { setSearch(''); go('doctors'); }} />
        </>
      );
}
