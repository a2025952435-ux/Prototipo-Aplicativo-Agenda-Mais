import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function RecoveryScreen(ctx: Pick<AgendaController, 'recoveryEmail' | 'setRecoveryEmail' | 'formMessage' | 'go' | 'back' | 'read' | 'submitRecovery'>) {
  const { recoveryEmail, setRecoveryEmail, formMessage, go, back, read, submitRecovery } = ctx;
      return (
        <>
          <DemoNotice onRead={read}>A demonstração não envia e-mails. Use qualquer endereço fictício em formato válido.</DemoNotice>
          <LabeledInput label="E-mail de exemplo" readText="O e-mail será usado somente para mostrar a validação desta tela." value={recoveryEmail} onChangeText={setRecoveryEmail} placeholder="voce@exemplo.com" keyboardType="email-address" autoCapitalize="none" autoComplete="off" />
          {formMessage ? <DemoNotice tone="warning" onRead={read}>{formMessage}</DemoNotice> : null}
          <ActionButton title="Mostrar instrução" icon="mail-outline" onPress={submitRecovery} />
          <ActionButton title="Voltar para entrar" icon="arrow-back" kind="outline" onPress={() => go('login')} />
        </>
      );
}
