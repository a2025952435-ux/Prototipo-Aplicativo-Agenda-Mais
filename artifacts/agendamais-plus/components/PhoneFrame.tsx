
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

type PhoneFrameProps = {
  children: React.ReactNode;
};

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const { width, height } = useWindowDimensions();

  // No celular, mostra o aplicativo normalmente.
  if (Platform.OS !== 'web' || width < 600) {
    return <View style={styles.mobile}>{children}</View>;
  }

  // No computador, mostra a moldura.
  const largura = Math.min(390, width - 40);
  const altura = Math.min(844, height - 40);

  return (
    <View style={styles.background}>
      <View
        style={[
          styles.phone,
          { width: largura, height: altura },
        ]}
      >
        <View style={styles.screen}>
          {children}
        </View>

        <View
          pointerEvents="none"
          style={styles.camera}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EEEAF3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  phone: {
    backgroundColor: '#111111',
    borderRadius: 44,
    padding: 7,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#444444',
  },

  screen: {
    flex: 1,
    backgroundColor: '#321B55',
    borderRadius: 36,
    overflow: 'hidden',
  },

  camera: {
    position: 'absolute',
    top: 17,
    alignSelf: 'center',
    width: 100,
    height: 25,
    backgroundColor: '#090909',
    borderRadius: 20,
  },

  mobile: {
    flex: 1,
  },
});
