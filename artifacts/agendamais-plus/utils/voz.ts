
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';

export function falar(texto: string) {
  if (!texto.trim()) return;

  if (Platform.OS === 'web') {
    if (!('speechSynthesis' in window)) {
      console.error('Navegador sem suporte à voz');
      return;
    }

    window.speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = 'pt-BR';
    voz.rate = 0.85;
    voz.pitch = 1;
    voz.volume = 1;

    window.speechSynthesis.speak(voz);
    return;
  }

  Speech.stop();

  Speech.speak(texto, {
    language: 'pt-BR',
    rate: 0.85,
    pitch: 1,
  });
}

export function pararvoz() {
  if (Platform.OS === 'web') {
    window.speechSynthesis.cancel();
    return;
  }

  Speech.stop();
}
