import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

class Calendar extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={{
            '2023-09-13': [{ name: 'Reunião de trabalho' }],
            '2023-09-14': [{ name: 'Ligar para o cliente' }, { name: 'Fazer compras' }],
            '2023-09-15': [],
          }}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default Calendar;