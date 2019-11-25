/* eslint-disable prefer-const */
/* eslint-disable react/no-unused-state */
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import math from 'mathjs';
import numeral from 'numeral';
import {Button, Display} from '../components';

export class BasicCalc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pastResult: '',
      resultText: '0',
      resultTextFontSize: 72,
      pastResultText: '',
      expression: '',
      minus: '-',
      orientation: 'potrait',
    };
    Dimensions.addEventListener('change', () => {
      const {width, height} = Dimensions.get('window');
      let orientation = width > height ? 'landscape' : 'potrait';
      this.setState({orientation});
    });

    this.backspace = this.backspace.bind(this);
    numeral.defaultFormat('0,0');
  }

  clear = () => {
    this.setState({
      result: 0,
      resultText: '0',
      resultTextFontSize: 72,
      pastResult: '',
      pastResultText: '',
      expression: '',
      minus: '-',
    });
  };

  backspace = () => {
    let {resultText} = this.state;

    this.setState({
      resultText: resultText.length > 1 ? resultText.slice(0, -1) : '0',
    });
  };

  plusMinusChange = () => {
    let {minus, resultText} = this.state;

    if (minus) {
      this.setState({
        resultText: minus + resultText,
        minus: '',
      });
      return;
    }

    this.setState({
      resultText: resultText.slice(1),
      minus: '-',
    });
  };

  writeResult = textToAppend => {
    let resultText = this.state.resultText.toString();
    let dotCount = resultText.split('.').length - 1;

    let isTextNotZero =
      resultText !== '0' && resultText !== '-0' && textToAppend !== '.';
    let isTextOneDot = textToAppend === '.' && dotCount === 0;

    if (isTextNotZero || isTextOneDot) {
      this.setState({
        resultText:
          textToAppend === '.' || resultText.includes('.')
            ? resultText + textToAppend
            : numeral(resultText + textToAppend).format(),
      });
    } else if (textToAppend !== '.') {
      this.setState({
        resultText: textToAppend,
        minus: '-',
      });
    }

    this.resizeResultText(this.state.resultText);
  };

  createExpression = operator => {
    let {pastResultText} = this.state;
    let hasPastResultTextEqual = pastResultText.includes('=');
    pastResultText = hasPastResultTextEqual
      ? `${this.state.resultText}${operator}`
      : `${this.state.pastResultText + this.state.resultText}${operator}`;

    let result = numeral(this.state.resultText).value();

    this.setState({
      expression: hasPastResultTextEqual
        ? result + mathOperatorsMap[operator]
        : // eslint-disable-next-line react/no-access-state-in-setstate
          (this.state.expression += result + mathOperatorsMap[operator]),
      pastResult: `${result}${mathOperatorsMap[operator]}`,
      pastResultText,
      resultText: '0',
    });
  };

  executeOperation = () => {
    let {pastResultText} = this.state;

    if (!pastResultText.includes('=')) {
      pastResultText += `${this.state.resultText}=`;
      this.createExpression('');

      // eslint-disable-next-line react/no-access-state-in-setstate
      let result = math.eval(this.state.expression);
      let resultParts = result.toString().split('.');
      // eslint-disable-next-line no-unused-vars
      let resultText = numeral(resultParts[0]).format() + resultParts[1];

      this.resizeResultText(result);

      this.setState({
        pastResultText,
        resultText: result,
      });
    }
  };

  resizeResultText = resultText => {
    // eslint-disable-next-line no-param-reassign
    resultText = resultText.toString();

    if (resultText.length > 13) {
      this.setState({resultTextFontSize: 32});
    } else if (resultText.length > 8) {
      this.setState({resultTextFontSize: 48});
    }
  };

  setNumber = number => {
    let num;
    if (this.state.number === 0) {
      num = number;
    } else {
      num = `${number}`;
    }
    this.setState({
      number: num,
      display: this.formatNumber(num),
    });
  };

  setOperator = operator => {
    this.setState({operator});
    this.setResult(operator);
  };

  setResult = (operator = null) => {
    // eslint-disable-next-line no-eval
    const num = eval(
      this.state.result + this.state.operator + Number(this.state.number),
    );
    if (operator) {
      this.setState(previusState => ({
        number: 0,
        memory: Number(previusState.number),
        result: num,
        display: this.formatNumber(num),
      }));
    } else {
      this.setState(previusState => ({
        number: Number(previusState.number),
        result: num,
        display: this.formatNumber(num),
      }));
    }
  };

  percentage = () => {
    const num = this.state.number / 100;
    this.setState(() => ({
      number: num,
      display: this.formatNumber(num),
    }));
  };

  plusMinus = () => {
    const num = this.state.number * -1;
    this.setState(() => ({
      number: num,
      display: this.formatNumber(num),
    }));
  };

  formatNumber = number => {
    return Number(number).toLocaleString();
  };

  renderPotrait = () => {
    return (
      <>
        <View style={styles.top}>
          <Display
            resultText={this.state.resultText}
            resultTextFontSize={this.state.resultTextFontSize}
            backspace={this.backspace}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Button
              text={this.state.resultText === '0' ? 'AC' : 'C'}
              theme="top"
              onPress={() => this.clear()}
            />
            <Button
              text="+/-"
              theme="top"
              onPress={() => this.plusMinusChange()}
            />
            <Button
              text="%"
              theme="top"
              onPress={() => this.createExpression('%')}
            />
            <Button
              text="&#247;"
              theme="right"
              onPress={() => this.createExpression('÷')}
            />
          </View>
          <View style={styles.row}>
            <Button text="7" onPress={() => this.writeResult('7')} />
            <Button text="8" onPress={() => this.writeResult('8')} />
            <Button text="9" onPress={() => this.writeResult('9')} />
            <Button
              text="x"
              theme="right"
              onPress={() => this.createExpression('×')}
            />
          </View>
          <View style={styles.row}>
            <Button text="4" onPress={() => this.writeResult('4')} />
            <Button text="5" onPress={() => this.writeResult('5')} />
            <Button text="6" onPress={() => this.writeResult('6')} />
            <Button
              text="-"
              theme="right"
              onPress={() => this.createExpression('-')}
            />
          </View>
          <View style={styles.row}>
            <Button text="1" onPress={() => this.writeResult('1')} />
            <Button text="2" onPress={() => this.writeResult('2')} />
            <Button text="3" onPress={() => this.writeResult('3')} />
            <Button
              text="+"
              theme="right"
              onPress={() => this.createExpression('+')}
            />
          </View>
          <View style={styles.row}>
            <Button text="0" special onPress={() => this.writeResult('0')} />
            <Button text="." onPress={() => this.writeResult('.')} />
            <Button
              text="="
              theme="right"
              onPress={() => this.executeOperation()}
            />
          </View>
        </View>
      </>
    );
  };

  renderLandscape = () => {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>"under development"</Text>
      </View>
    );
  };

  render() {
    const view =
      this.state.orientation === 'potrait'
        ? this.renderPotrait()
        : this.renderLandscape();
    return <SafeAreaView style={styles.container}>{view}</SafeAreaView>;
  }
}

const mathOperatorsMap = {
  '': '',
  '÷': '/',
  '×': '*',
  '+': '+',
  '-': '-',
  '%': '%',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 35,
    color: '#fff',
  },
  top: {
    flex: 0.3,
    padding: 5,
    // // paddingBottom: 5,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
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
export default BasicCalc;
