import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function RegisterScreen(ctx: Pick<AgendaController, 'registerName' | 'setRegisterName' | 'registerEmail' | 'setRegisterEmail' | 'registerPassword' | 'setRegisterPassword' | 'registerConfirmation' | 'setRegisterConfirmation' | 'formMessage' | 'go' | 'back' | 'read' | 'submitRegistration'>) {
  const { registerName, setRegisterName, registerEmail, setRegisterEmail, registerPassword, setRegisterPassword, registerConfirmation, setRegisterConfirmation, formMessage, go, back, read, submitRegistration } = ctx;
      return (
        <>
          <DemoNotice onRead={read}>Os campos são temporários. Nenhum dado será enviado ou salvo no perfil.</DemoNotice>
          <LabeledInput label="Nome de demonstração" readText="Digite um nome fictício para preencher o exemplo." value={registerName} onChangeText={setRegisterName} placeholder="Nome para o exemplo" autoComplete="off" />
          <LabeledInput label="E-mail de exemplo" readText="Digite um e-mail fictício. Ele não será guardado." value={registerEmail} onChangeText={setRegisterEmail} placeholder="voce@exemplo.com" keyboardType="email-address" autoCapitalize="none" autoComplete="off" />
          <LabeledInput label="Senha de demonstração" readText="Use uma senha fictícia de 6 caracteres ou mais." value={registerPassword} onChangeText={setRegisterPassword} placeholder="Não use sua senha real" secureTextEntry autoComplete="off" />
          <LabeledInput label="Confirme a senha" readText="Digite novamente a senha fictícia." value={registerConfirmation} onChangeText={setRegisterConfirmation} placeholder="Repita a senha de exemplo" secureTextEntry autoComplete="off" />
          {formMessage ? <DemoNotice tone="warning" onRead={read}>{formMessage}</DemoNotice> : null}
          <ActionButton title="Continuar" icon="arrow-forward" onPress={submitRegistration} />
          <ActionButton title="Voltar ao acesso" icon="arrow-back" kind="outline" onPress={() => go('login')} />
        </>
      );
}
