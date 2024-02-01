import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ButtonProps, StyleProp, TextStyle} from 'react-native';

interface MyButtonProps extends ButtonProps{
    style : StyleProp<TextStyle>
}

const MyButton = ({ onPress, title, style }:MyButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    padding: 3,
    borderRadius: 5,
    textAlign : "center",
    alignItems: "center",
  },
});

export default MyButton

