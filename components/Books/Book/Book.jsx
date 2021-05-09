import React, { PureComponent } from "react";
import { View, Button, Text, Image, StyleSheet } from "react-native";
import * as booksInfo from "./booksInfo/books";

class Book extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return (
      <View>
        <Image style={styles.imageSize} source={this.props.poster} />
        <Text>Title: {booksInfo[this.props.id].title}</Text>
        <Text>Subtitle: {booksInfo[this.props.id].subtitle}</Text>
        <Text>Rated: {booksInfo[this.props.id].rating}</Text>
        <Text>Authors: {booksInfo[this.props.id].authors}</Text>
        <Text>Publisher: {booksInfo[this.props.id].publisher}</Text>
        <Text>isbn13: {booksInfo[this.props.id].isbn13}</Text>
        <Text>Pages: {booksInfo[this.props.id].pages}</Text>
        <Text>Year: {booksInfo[this.props.id].year}</Text>
        <Text>Rating: {booksInfo[this.props.id].rating}</Text>
        <Text>Desc: {booksInfo[this.props.id].desc}</Text>
        <Text>Price: {booksInfo[this.props.id].price}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageSize: {
    width: 100,
    height: 100,
    margin: 20,
    borderWidth: 0,
    borderColor: "gray",
  },
});

export default Book;
