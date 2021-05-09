import React, { PureComponent } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
  Button,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import booksMock from "./BooksList.json";
import paths from "./postersPath";
import Book from "./Book/Book";
import AddBook from "./AddBook";

class Books extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      showBook: false,
      showaddBook: false,
      bookId: "",
      posterPath: "",
      books: [],
    };
    this.showDefaultPage = this.showDefaultPage.bind(this);
  }

  showBook(id, posterPath) {
    if (!id || id == "noid") {
      alert("This book haven't details");
    } else if (id !== "noid") {
      this.setState({
        showBook: true,
        bookId: id,
        posterPath,
      });
    } else {
      alert("It's only for test");
    }
  }
  showDefaultPage() {
    this.setState({
      showBook: false,
      showaddBook: false,
      bookId: "",
      posterPath: "",
    });
  }
  addBook() {
    this.setState({
      showaddBook: true,
    });
  }
  async deleteBook(id) {
    this.setState({
      books: this.state.books.filter((book) => {
        if (book.id) {
          return book.id !== id;
        } else {
          return book;
        }
      }),
    });
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      try {
        let fileUri = FileSystem.documentDirectory + "BooksList.txt";
        let txt = await FileSystem.readAsStringAsync(fileUri);
        txt ? (txt = txt) : (txt = JSON.stringify({ books: [] }));
        console.log(txt);
        if (txt.books != undefined) {
          await FileSystem.writeAsStringAsync(
            fileUri,
            JSON.stringify({
              books: txt.books.filter((book) => book.id !== id),
            }),
            { encoding: FileSystem.EncodingType.UTF8 }
          );
        }
      } catch (e) {
        alert(e);
      }
    }
  }

  componentDidMount() {
    (async () => {
      try {
        let fileUri = FileSystem.documentDirectory + "BooksList.txt";
        let txt = await FileSystem.readAsStringAsync(fileUri);
        txt ? (txt = txt) : (txt = JSON.stringify({ books: [] }));
        this.setState({
          books: [...booksMock.books, ...JSON.parse(txt).books],
        });
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
      <ScrollView style={[styles.margTop, styles.mainSize]}>
        {(() => {
          if (this.state.showaddBook) {
            return <AddBook showDefaultPage={this.showDefaultPage} />;
          } else if (this.state.showBook) {
            return (
              <>
                <Button
                  title="Hide"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                  onPress={() => this.showDefaultPage()}
                />
                <Book
                  id={this.state.bookId}
                  poster={this.state.posterPath}
                  func={this.hideBook}
                />
              </>
            );
          } else {
            return (
              <>
                <Button
                  title="Add Book"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                  onPress={() => this.addBook()}
                />
                {this.state.books.map((book, index) => {
                  const id = book.id ? book.id : false;
                  const isbn13 =
                    book.isbn13 && book.isbn13 != "noid"
                      ? `b${book.isbn13}`
                      : false;
                  const imagePath = paths[index] ? paths[index].image : "";
                  return (
                    <TouchableHighlight
                      onPress={() => this.showBook(isbn13, imagePath)}
                      key={index}
                    >
                      <View style={styles.book}>
                        {paths[index] ? (
                          <Image
                            style={styles.imageSize}
                            source={paths[index].image}
                          />
                        ) : (
                          <View style={styles.imageSize} />
                        )}
                        <View style={styles.infoBlock}>
                          <Text style={styles.text}>{`${book.title}`}</Text>
                          <Text
                            style={styles.text}
                          >{`Subtitle: ${book.subtitle}`}</Text>
                          <Text
                            style={styles.text}
                          >{`Price: ${book.price}`}</Text>
                        </View>
                        {id && (
                          <Button
                            title="Delete"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                            onPress={() => this.deleteBook(id)}
                          />
                        )}
                      </View>
                    </TouchableHighlight>
                  );
                })}
              </>
            );
          }
        })()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainSize: {
    width: "100%",
  },
  margTop: {
    marginTop: 40,
    padding: 20,
  },
  book: {
    // width:350,
    height: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageSize: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 0,
    borderColor: "gray",
  },
  infoBlock: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
});

export default Books;
