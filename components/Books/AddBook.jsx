import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,

  Button,
  StyleSheet,
  View,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

const priceValidation = (book) =>
  book.price > 0 && book.price < 99999 ? true : false;
const titleValidation = (book) => (book.title.trim() ? true : false);
const subtitleValidation = (book) => (book.subtitle.trim() ? true : false);

function AddBook(props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [price, setPrice] = useState("");

  const addBookToJson = async (book) => {
    if (!titleValidation(book)) {
      alert("Please set the title");
    } else if (!priceValidation(book)) {
      alert("Please set the correct price");
    } else if (!subtitleValidation(book)) {
      alert("Please set the subtitle");
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        try {
          let fileUri = FileSystem.documentDirectory + "BooksList.txt";
          let txt = await FileSystem.readAsStringAsync(fileUri);
          txt = JSON.parse(txt);
          await FileSystem.writeAsStringAsync(
            fileUri,
            JSON.stringify({
              books: [
                ...txt.books,
                {
                  title: book.title,
                  subtitle: book.subtitle,
                  price: book.price,
                  id: uuidv4(),
                },
              ],
            }),
            { encoding: FileSystem.EncodingType.UTF8 }
          );
          props.showDefaultPage();
        } catch (e) {
          alert(e);
        }
      }
    }
  };

  const readFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + "BooksList.txt";
      const txt = await FileSystem.readAsStringAsync(fileUri);
      alert(txt);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <SafeAreaView>
      <Text>Title:</Text>
      <TextInput onChangeText={setTitle} value={title} placeholder="title" />
      <Text>Subtitle:</Text>
      <TextInput
        onChangeText={setSubTitle}
        value={subtitle}
        placeholder="subtitle"
      />
      <Text>Price:</Text>
      <TextInput
        onChangeText={setPrice}
        value={price}
        placeholder="price"
        keyboardType="numeric"
      />
      <View style={styles.margButton}>
        <Button
          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => addBookToJson({ title, subtitle, price })}
        />
      </View>
      <View style={styles.margButton}>
        <Button
          title="Hide"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => props.showDefaultPage()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  margButton: {
    paddingTop: 20,
  },
});

export default AddBook;
