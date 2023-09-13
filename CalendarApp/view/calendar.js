import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Button } from 'react-native-paper';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:{
        '2023-09-13': [{id:1, name: 'Reunião de trabalho', time: '14:00 - 16:00'  }],
        '2023-09-14': [{id:2, name: 'Ligar para o cliente', time: '11:00 - 11:30' }, {id:3, name: 'Ligar para o cliente', time: '11:00 - 11:30' }],
      }
    };
  }

  handleDelete = (itemId) => {
      const itemsNew = this.state.items;
      for(let i in this.state.items){
        for(let j in this.state.items[i]){
          if(this.state.items[i][j].id == itemId){
            alert(itemsNew[i][j].name + ' foi deletado com sucesso!');
            itemsNew[i].splice(j, 1);
            this.setState({items: itemsNew });
          }
        }
      }
  }

  render() {
    return (
      <View style={{ flex: 1 , paddingTop: 30 }}>
        <Agenda
          items={this.state.items}
          renderItem={(item) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.time}>{item.time}</Text>
                <Text>{item.name}</Text>
              </View>
              <Button style={styles.btn} onPress={() => this.handleDelete(item.id)}><Text style={styles.btntxt}>X</Text></Button>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10,
  },
  btn: {
    width: 40,
    height: 40, 
    backgroundColor: '#f0f0f0',
    borderRadius: '100%',
    marginRight: 40,
  },
  btntxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4F4F4F',
  }
});

export default Calendar;