import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

const Display = props => {
  return (
    <View style={styles.resultsView}>
      <TouchableWithoutFeedback onPress={() => props.backspace()}>
        <View>
          <Text
            style={[styles.resultText, {fontSize: props.resultTextFontSize}]}>
            {props.resultText}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Display;
const styles = StyleSheet.create({
  resultsView: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  resultText: {
    color: '#fff',
    textAlign: 'right',
  },
});
