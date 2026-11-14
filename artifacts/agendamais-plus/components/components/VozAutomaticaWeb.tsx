
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { falar } from '../utils/voz';

export default function VozAutomaticaWeb() {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    function aoClicar(evento: MouseEvent) {
      const elemento = evento.target;

      if (!(elemento instanceof Element)) return;

      const botao = elemento.closest(
        'button, [role="button"]'
      );

      if (!botao) return;

      const texto = (
        botao.getAttribute('aria-label') ||
        botao.textContent ||
        ''
      ).trim();

      if (!texto) return;

      // Evita ler textos excessivamente longos.
      const textoFinal = texto.slice(0, 250);

      falar(textoFinal);
    }

    document.addEventListener('click', aoClicar);

    return () => {
      document.removeEventListener('click', aoClicar);
    };
  }, []);

  return null;
}
