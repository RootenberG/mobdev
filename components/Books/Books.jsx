import React, { PureComponent } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
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
import CachedImage from "../../helpers/CachedImage";

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
      value: "",
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

  async setLocalFile(req, resp) {
    try {
      let fileUri = FileSystem.cacheDirectory + "BooksList.txt";
      console.log(fileUri);
      let txt;
      txt = false;
      // fileUri
      //   ? (txt = await FileSystem.readAsStringAsync(fileUri))
      //   : (txt = false);
      const newBooks = txt
        ? { ...JSON.parse(txt), [req]: resp }
        : { [req]: resp };
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newBooks), {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (e) {
      alert(e);
    }
  }

  async getLocalFile(req) {
    try {
      let fileUri = FileSystem.cacheDirectory + "BooksList.txt";
      let txt = await FileSystem.readAsStringAsync(fileUri);
      txt = JSON.parse(txt);
      let res;
      req in txt
        ? (res = { Error: false, response: txt[req] })
        : (res = {
            Error: true,
            message: "Request not found, please connect to the internet",
          });
      return res;
    } catch (e) {
      alert(e);
    }
  }

  async getBooksFetch(text) {
    try {
      const response = await fetch(
        `https://api.itbook.store/1.0/search/${text}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const books = await response.json();
      // alert(JSON.stringify(films));
      if (books.error === "0") {
        await this.setState({
          books: books.books,
        });
        await this.setLocalFile(text, books.books);
      } else {
        alert("Server not working!");
      }
    } catch (e) {
      const localBooks = await this.getLocalFile(text);
      localBooks.Error
        ? alert(localBooks.message)
        : this.setState({
          books: localBooks.response,
          });
    }
  }
  handleChangeText(text) {
    this.setState({
      value: text,
    });
    text.length > 3 && this.getBooksFetch(text);
    text.length <= 3 && this.setState({ books: [] });
  }
  componentDidMount() {
    (async () => {
      try {
        // let fileUri = FileSystem.documentDirectory + "MoviesList.txt";
        // await FileSystem.writeAsStringAsync(
        //   fileUri,
        //   JSON.stringify({
        //     Search: [],
        //   }),
        //   { encoding: FileSystem.EncodingType.UTF8 }
        // );
        // let txt = await FileSystem.readAsStringAsync(fileUri);
        // txt ? txt = txt :(txt = JSON.stringify({ Search: [] }));
        // this.setState({
        //   films: [...filmsMock.Search, ...JSON.parse(txt).Search],
        // });
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
                  onPress={() => this.addBook()}
                />
                <TextInput
                  title="Add Book"
                  color="#DB29DB"
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 5,
                  }}
                  onChangeText={(text) => this.handleChangeText(text)}
                  value={this.state.value}
                />
                {this.state.books != undefined &&
                this.state.books.length != 0 ? (
                  this.state.books.map((book, index) => {
                    const id = book.id ? book.id : false;
                    const isbn13 =
                      book.isbn13 && book.isbn13 != "noid"
                        ? book.isbn13
                        : "";
                    return (
                      <TouchableHighlight
                        onPress={() => this.showBook(isbn13, book.path)}
                        key={index}
                      >
                        <View style={styles.book}>
                          {book.image ? (
                            <CachedImage
                              title={book.isbn13}
                              style={styles.imageSize}
                              source={book.image}
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
                  })
                ) : (
                  <View style={styles.notFound}>
                    <Text style={styles.notFoundText}>No items found</Text>
                  </View>
                )}
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
  notFound: {
    paddingTop: 100,
  },
  notFoundText: {
    textAlign: "center",
    color: "#DB29DB",
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
});

export default Books;
