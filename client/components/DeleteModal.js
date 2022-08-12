import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Icon } from "@rneui/themed";
import {SERVER_IP} from '@env';

export default function DeleteModal({id, setJhas}) {
  const [modalVisible, setModalVisible] = useState(false);

  const deleteJha = () => {
    try {
      axios.delete(SERVER_IP+`/api/jhas/${id}`);
    } 
    catch (err) {console.log(err)} 
    finally {
      const getJhas = async () => {
        try {
          const res = await axios.get(SERVER_IP+'/api/jhas');
          setJhas(res.data);
        } catch (err) {console.log(err)}
      };
      getJhas();
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete? This operation cannot be undone.</Text>
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.okButton]}
                onPress={() => deleteJha()}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Icon
      color="red"
      containerStyle={{}}
      disabledStyle={{}}
      iconProps={{}}
      iconStyle={{}}
      name="delete"
      onPress={() => setModalVisible(true)}
      size={30}
      type="material"
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 62,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonView: {
    flexDirection: 'row'
  },
  button: {
    width: '48%',
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  okButton: {
    backgroundColor: "red",
    marginRight: 10
  },
  cancelButton: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
