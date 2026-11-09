import React from 'react';
import { View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton, AppText, AudioAction, BrandLogo, DemoNotice, FeatureCard, LabeledInput, SelectionCard } from '@/components/AgendaMaisUI';
import { StatusText, SelectionPill, SectionHeading, PreferenceSwitch, InfoCard, EmptyState } from '@/components/common/AgendaScreenParts';
import { styles } from '@/styles/agendaStyles';
import { specialties, exampleTimes, titles, descriptions } from '@/constants/agendaData';
import { formatDay, visitLabel } from '@/utils/agendaHelpers';
import type { AgendaController } from '@/hooks/useAgendaController';

export default function EditProfileScreen(ctx: Pick<AgendaController, 'formMessage' | 'setFormMessage' | 'setProfileName' | 'draftProfileName' | 'setDraftProfileName' | 'draftProfileEmail' | 'setDraftProfileEmail' | 'draftProfilePhone' | 'setDraftProfilePhone' | 'go' | 'read'>) {
  const { formMessage, setFormMessage, setProfileName, draftProfileName, setDraftProfileName, draftProfileEmail, setDraftProfileEmail, draftProfilePhone, setDraftProfilePhone, go, read } = ctx;
      return (
        <>
          <DemoNotice onRead={read}>Não digite dados sensíveis. O que preencher fica apenas na memória desta sessão.</DemoNotice>
          <LabeledInput label="Nome para esta sessão" readText="O nome não será salvo depois que você fechar o aplicativo." value={draftProfileName} onChangeText={setDraftProfileName} placeholder="Nome" autoComplete="off" />
          <LabeledInput label="E-mail (opcional)" readText="O endereço é temporário e não será salvo nem enviado." value={draftProfileEmail} onChangeText={setDraftProfileEmail} placeholder="E-mail opcional" keyboardType="email-address" autoCapitalize="none" autoComplete="off" />
          <LabeledInput label="Telefone (opcional)" readText="O número é temporário e não será salvo nem enviado." value={draftProfilePhone} onChangeText={setDraftProfilePhone} placeholder="Telefone opcional" keyboardType="phone-pad" autoComplete="off" />
          {formMessage ? <DemoNotice tone="warning" onRead={read}>{formMessage}</DemoNotice> : null}
          <ActionButton title="Salvar só nesta sessão" icon="checkmark" onPress={() => {
            if (!draftProfileName.trim()) {
              setFormMessage('Digite um nome para continuar.');
              return;
            }
            setProfileName(draftProfileName.trim());
            setDraftProfileEmail('');
            setDraftProfilePhone('');
            setFormMessage('');
            go('profile');
          }} />
          <ActionButton title="Descartar alterações" icon="close" kind="outline" onPress={() => go('profile')} />
        </>
      );
}
