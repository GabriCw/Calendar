import React, { Component } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Button, TextInput } from 'react-native-paper';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:{
        '2023-09-13': [{id:1, name: 'Reunião de trabalho', time: '14:00 - 16:00'  }],
        '2023-09-14': [{id:2, name: 'Ligar para o cliente', time: '11:00 - 11:30' }, {id:3, name: 'Ligar para o cliente', time: '11:00 - 11:30' }],
      },
      isModalVisible: false,
      newTask: {
        name: '',
        time: '',
      },
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

  handleAdd = () => {
    const { newTask } = this.state;
    const dateKey = '2023-09-15'; // Defina a chave de data apropriada aqui.
    const newItem = { id: Date.now(), ...newTask };
    
    if (!this.state.items[dateKey]) {
      this.state.items[dateKey] = [];
    }

    this.state.items[dateKey].push(newItem);

    this.setState({
      isModalVisible: false,
      newTask: { name: '', time: '' },
    });
  };

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
        <Button onPress={() => this.setState({ isModalVisible: true })}>Adicionar Tarefa</Button>

        <AddTaskModal
          isVisible={this.state.isModalVisible}
          newTask={this.state.newTask}
          onClose={() => this.setState({ isModalVisible: false })}
          onSave={this.handleAdd}
          onChange={(fieldName, value) => this.setState({ newTask: { ...this.state.newTask, [fieldName]: value } })}
        />
      </View>
    );
  }
}

class AddTaskModal extends Component {
  render() {
    const { isVisible, newTask, onClose, onSave, onChange } = this.props;

    return (
      <Modal visible={isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput style={styles.modalinput} underlineColor="transparent" 
            placeholder="Nome da Tarefa"
            value={newTask.name}
            onChangeText={(text) => onChange('name', text)}
          />
          <TextInput style={styles.modalinput} underlineColor="transparent"
            placeholder="Horário"
            value={newTask.time}
            onChangeText={(text) => onChange('time', text)}
          />
          <Button style={styles.modalbutton1} onPress={onSave}>Salvar</Button>
          <Button style={styles.modalbutton2} onPress={onClose}>Cancelar</Button>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalinput: {
    width: '80%',
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    borderBlockColor: '#000',
  },
  modalbutton1: {
    width: '30%',
    marginBottom: 10,
    backgroundColor: '#f2dbf0',
    marginTop: 30,
  },
  modalbutton2: {
    width: '30%',
    marginBottom: 10,
    backgroundColor: '#f2dbf0',
  },
});

export default Calendar;