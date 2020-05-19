import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import colors from '../config/Colors';
// import tempData from '../model/tempData';
import TodoList from '../components/TodoList';
import AddListModal from '../components/AddListModal';
import {queryAllTodoList} from '../database/database';

const HomeScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  let [state, setState] = useState({modalVisible: false, todos: []});

  useEffect(() => {
    queryAllTodoList().then(todos => {
      console.log(JSON.stringify(todos));
      setState(preSate => ({...preSate, todos: todos}));
    });
    return () => {};
  }, []);

  const renderList = list => {
    return <TodoList list={list} />;
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <AddListModal
          closeModal={() =>
            setState(preSate => ({...preSate, modalVisible: false}))
          }
        />
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{fontWeight: '300', color: '#24A6D9'}}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{marginVertical: 48}}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() =>
            setState(preSate => ({...preSate, modalVisible: true}))
          }>
          <Text style={{fontSize: 20, color: '#24A6D9'}}>+</Text>
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={state.todos}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => renderList(item)}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
