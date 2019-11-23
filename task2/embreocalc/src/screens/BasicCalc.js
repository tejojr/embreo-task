import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from '../components';
import calcFunc, {initialState} from '../utils/calcFunc';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  top: {
    flex: 0.3,
    padding: 5,
    // paddingBottom: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottom: {
    flex: 0.7,
  },
  numberArea: {
    color: '#fff',
    fontSize: 70,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});
export class BasicCalc extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleTap = (type, value) => {
    this.setState(state => calcFunc(type, value, state));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.numberArea}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Button
              text="AC"
              theme="top"
              onPress={() => this.handleTap('clear')}
            />
            <Button
              text="+/-"
              theme="top"
              onPress={() => this.handleTap('posneg')}
            />
            <Button
              text="%"
              theme="top"
              onPress={() => this.handleTap('percentage')}
            />
            <Button
              text="&#247;"
              theme="right"
              onPress={() => this.handleTap('operator', '/')}
            />
          </View>
          <View style={styles.row}>
            <Button text="7" onPress={() => this.handleTap('number', 7)} />
            <Button text="8" onPress={() => this.handleTap('number', 8)} />
            <Button text="9" onPress={() => this.handleTap('number', 9)} />
            <Button
              text="x"
              theme="right"
              onPress={() => this.handleTap('operator', '*')}
            />
          </View>
          <View style={styles.row}>
            <Button text="4" onPress={() => this.handleTap('number', 4)} />
            <Button text="5" onPress={() => this.handleTap('number', 5)} />
            <Button text="6" onPress={() => this.handleTap('number', 6)} />
            <Button
              text="-"
              theme="right"
              onPress={() => this.handleTap('operator', '-')}
            />
          </View>
          <View style={styles.row}>
            <Button text="1" onPress={() => this.handleTap('number', 1)} />
            <Button text="2" onPress={() => this.handleTap('number', 2)} />
            <Button text="3" onPress={() => this.handleTap('number', 3)} />
            <Button
              text="+"
              theme="right"
              onPress={() => this.handleTap('operator', '+')}
            />
          </View>
          <View style={styles.row}>
            <Button
              text="0"
              special
              onPress={() => this.handleTap('number', 0)}
            />
            <Button text="." onPress={() => this.handleTap('number', '.')} />
            <Button
              text="="
              theme="right"
              onPress={() => this.handleTap('equal')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default BasicCalc;
