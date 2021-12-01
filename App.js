import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  Pressable,
} from "react-native";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://thronesapi.com/api/v2/Characters")
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, []);

  const Character = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.imageCard} />
        <Pressable
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.textCard, styles.textStyle]}>{item.fullName}</Text>
        </Pressable>
      </View>
    );
  };

  const CharacterInfo = ({ item }) => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>First name: {item.firstName}</Text>
          <Text style={styles.modalText}>Last name: {item.lastName}</Text>
          <Text style={styles.modalText}>Title: {item.title}</Text>
          <Text style={styles.modalText}>Family: {item.family}</Text>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <ScrollView  horizontal={true}style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <FlatList
          data={characters}
          render={CharacterInfo}
          keyExtractor={(item) => item.id}
        />
      </Modal>

      <FlatList data={characters} renderItem={Character} horizontal={true} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7ede2",
  },
  card: {
    marginHorizontal: 10,
    marginTop: 40,
    borderWidth: 2,
    borderColor: "#d14c4c",
    borderRadius: 25,
    height: 250,
    alignItems: "center",
    backgroundColor: "#fcc48c",
  },
  imageCard: {
    width: 200,
    height: 200,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
  textCard: {
    margin: 10,
    textAlign: "center",
    color: "#4f2424",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  buttonClose: {
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
