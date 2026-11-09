import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function DoctorsScreen(ctx: Pick<AgendaController, 'specialty' | 'setProvider' | 'search' | 'setSearch' | 'theme' | 'matchingProviders' | 'go' | 'back' | 'read'>) {
  const { specialty, setProvider, search, setSearch, theme, matchingProviders, go, back, read } = ctx;
      return (
        <>
          <LabeledInput label="Buscar profissionais" readText="Digite parte do nome ou da especialidade." value={search} onChangeText={setSearch} placeholder="Buscar profissional" autoCapitalize="none" />
          {matchingProviders.map((item) => (
            <View key={item.name} style={[styles.personCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.avatar, { backgroundColor: theme.secondary }]}>
                <Ionicons name="person-outline" size={30} color={theme.primary} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <AppText variant="section">{item.name}</AppText>
                <AppText variant="body">{item.specialty}</AppText>
              </View>
              <AudioAction text={`${item.name}. Especialidade: ${item.specialty}. `} onRead={read} compact />
              <ActionButton title="Ver perfil" icon="chevron-forward" kind="secondary" onPress={() => { setProvider(item.name); go('doctor'); }} />
            </View>
          ))}
          {matchingProviders.length === 0 ? (
            <EmptyState title="Nenhum profissional encontrado" description="Tente buscar por outra palavra." icon="search-outline" />
          ) : null}
          <ActionButton title="Escolher outra especialidade" icon="arrow-back" kind="outline" onPress={() => go('specialty')} />
        </>
      );
}
