import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Text, Appbar, Card, Divider, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const units = ['Metre', 'Millimetre', 'Mile', 'Foot'];

const unitConversion: Record<string, number> = {
  Metre: 1,
  Millimetre: 1000,
  Mile: 0.000621371,
  Foot: 3.28084,
};

export default function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('Metre');
  const [toUnit, setToUnit] = useState<string>('Metre');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setError(true);
      setResult(null);
      return;
    }

    const fromFactor = unitConversion[fromUnit];
    const toFactor = unitConversion[toUnit];

    const convertedValue = (value / fromFactor) * toFactor;
    setResult(`${convertedValue.toFixed(2)} ${toUnit}`);
    setError(false);
  };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Length Converter" />
          </Appbar.Header>

          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Enter value"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                error={error}
                style={styles.input}
              />
              <HelperText type="error" visible={error}>
                Please enter a valid number.
              </HelperText>

              <View style={styles.pickerRow}>
                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>From: </Text>
                  <Picker
                    selectedValue={fromUnit}
                    style={styles.picker}
                    onValueChange={(itemValue: string) => setFromUnit(itemValue)}
                  >
                    {units.map((unit) => (
                      <Picker.Item key={unit} label={unit} value={unit} />
                    ))}
                  </Picker>
                </View>

                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>To: </Text>
                  <Picker
                    selectedValue={toUnit}
                    style={styles.picker}
                    onValueChange={(itemValue: string) => setToUnit(itemValue)}
                  >
                    {units.map((unit) => (
                      <Picker.Item key={unit} label={unit} value={unit} />
                    ))}
                  </Picker>
                </View>
              </View>

              <Button mode="contained" onPress={handleConvert} style={styles.convertButton}>
                Convert
              </Button>

              {result && (
                <>
                  <Divider style={styles.divider} />
                  <Text style={styles.resultText}>Result: {result}</Text>
                </>
              )}
            </Card.Content>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginVertical: 20,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 16,
    paddingBottom: 8,
  },
  picker: {
    height: 50,
  },
  convertButton: {
    marginTop: 150,
  },
  resultText: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 20,
  },
});
