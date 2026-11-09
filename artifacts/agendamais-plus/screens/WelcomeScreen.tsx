import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function WelcomeScreen(ctx: Pick<AgendaController, 'go' | 'read'>) {
  const { go, read } = ctx;
      return (
        <>
          <View style={styles.centerBlock}>
            <BrandLogo size={78} />
            <AppText variant="title" style={styles.centerText}>Olá! Vamos começar?</AppText>
            <AppText variant="body" style={styles.centerText}>
              Você pode conhecer o AgendaMais+ sem criar uma conta.
            </AppText>
          </View>
          <ActionButton title="Começar sem conta" icon="arrow-forward" onPress={() => go('accessibility')} />
          <ActionButton title="Entrar" icon="log-in-outline" kind="secondary" onPress={() => go('login')} />
          <ActionButton title="Criar cadastro" icon="person-add-outline" kind="outline" onPress={() => go('register')} />
        </>
      );
}
