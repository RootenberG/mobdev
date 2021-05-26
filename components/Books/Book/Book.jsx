import React, { PureComponent } from "react";
import { View, Button, Text, Image, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

class Book extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      book: {},
    };
  }
  componentDidMount() {
    (async () => {
      try {
        setTimeout(async () => {
          const response = await fetch(
            `https://api.itbook.store/1.0/books/${this.props.id}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const book = await response.json();
          this.setState({
            book,
          });
        }, 2000);
      } catch (e) {
        alert(e);
      }
    })();
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
         {this.state.book.year ? (
          <>
        <Image style={styles.imageSize} source={{ uri: this.state.book.image }} />
        <Text>Title: {this.state.book.title}</Text>
        <Text>Subtitle: {this.state.book.subtitle}</Text>
        <Text>Rated: {this.state.book.rating}</Text>
        <Text>Authors: {this.state.book.authors}</Text>
        <Text>Publisher: {this.state.book.publisher}</Text>
        <Text>isbn13: {this.state.book.isbn13}</Text>
        <Text>Pages: {this.state.book.pages}</Text>
        <Text>Year: {this.state.book.year}</Text>
        <Text>Rating: {this.state.book.rating}</Text>
        <Text>Desc: {this.state.book.desc}</Text>
        <Text>Price: {this.state.book.price}</Text>
        </>
        ) : (
          <Spinner
            visible={this.state.book.year ? false : true}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
        )}
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
