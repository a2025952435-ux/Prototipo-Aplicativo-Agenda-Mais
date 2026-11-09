import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function LoginScreen(ctx: Pick<AgendaController, 'loginEmail' | 'setLoginEmail' | 'loginPassword' | 'setLoginPassword' | 'formMessage' | 'go' | 'openTab' | 'read' | 'submitLogin'>) {
  const { loginEmail, setLoginEmail, loginPassword, setLoginPassword, formMessage, go, openTab, read, submitLogin } = ctx;
      return (
        <>
          <DemoNotice onRead={read}>Não use sua senha real. O acesso é local e não cria uma conta.</DemoNotice>
          <LabeledInput
            label="E-mail"
            readText="Digite seu e-mail para continuar. Ele não será guardado."
            value={loginEmail}
            onChangeText={setLoginEmail}
            placeholder="voce@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="off"
            testID="login-email"
          />
          <LabeledInput
            label="Senha"
            readText="Digite uma senha com pelo menos 4 caracteres. Não use sua senha real."
            value={loginPassword}
            onChangeText={setLoginPassword}
            placeholder="Não use sua senha real"
            secureTextEntry
            autoComplete="off"
            testID="login-password"
          />
          {formMessage ? <DemoNotice tone="warning" onRead={read}>{formMessage}</DemoNotice> : null}
          <ActionButton title="Continuar" icon="arrow-forward" onPress={submitLogin} testID="login-submit" />
          <ActionButton title="Esqueci minha senha" icon="help-circle-outline" kind="outline" onPress={() => go('recovery')} />
          <ActionButton title="Criar cadastro" icon="person-add-outline" kind="secondary" onPress={() => go('register')} />
          <ActionButton title="Entrar sem conta" icon="home-outline" kind="outline" onPress={() => openTab('home')} />
        </>
      );
}
