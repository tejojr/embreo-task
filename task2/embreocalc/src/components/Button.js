import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;
const baseButton = {
  height: Math.floor(buttonWidth - 10),
  justifyContent: 'center',
  borderRadius: Math.floor(buttonWidth),
  margin: 5,
};
const baseText = {
  fontSize: 25,
};

const styles = StyleSheet.create({
  textMain: {
    ...baseText,
    color: '#fff',
  },
  textSecondary: {
    ...baseText,
    color: '#060606',
  },
  buttonMain: {
    ...baseButton,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#505050',
  },
  buttonTwoColumn: {
    ...baseButton,
    backgroundColor: '#505050',
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  buttonTop: {
    ...baseButton,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#D4D4D2',
  },
  buttonRight: {
    ...baseButton,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FF9500',
  },
});
const Button = ({onPress, text, theme, special}) => {
  let stylesButton = styles.buttonMain;
  let stylesText = styles.textMain;
  if (theme === 'top') {
    stylesText = styles.textSecondary;
    stylesButton = styles.buttonTop;
  } else if (theme === 'right') {
    stylesText = styles.textMain;
    stylesButton = styles.buttonRight;
  } else {
    stylesText = styles.textMain;
    stylesButton = styles.buttonMain;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={special ? styles.buttonTwoColumn : stylesButton}>
      <Text style={stylesText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
