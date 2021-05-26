import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StudyIcon,  GraphIcon, BooksIcon, PhotosIcon } from "./Icons";

function NavBar(props) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() => props.changePage("home")}
        style={styles.touchable}
      >
        <View
          style={[
            styles.centeredText,
            props.onPage === "home" && styles.active,
          ]}
        >
          <StudyIcon />
          <Text>General</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.changePage("graph")}
        style={styles.touchable}
      >
        <View
          style={[
            styles.centeredText,
            props.onPage === "graph" && styles.active,
          ]}
        >
          <GraphIcon />
          <Text>Graph</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.changePage("books")}
        style={styles.touchable}
      >
        <View
          style={[
            styles.centeredText,
            props.onPage === "books" && styles.active,
          ]}
        >
          <BooksIcon />
          <Text>Books</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.changePage("photos")}
        style={styles.touchable}
      >
        <View
          style={[
            styles.centeredText,
            props.onPage === "photos" && styles.active,
          ]}
        >
          <PhotosIcon />
          <Text style={styles.textFont}>Photos</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textFont: {
    fontSize: 13,
  },
  centeredText: {
    height: "100%",
    padding: 30,
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  touchable: {
    flex: 0.5,
    height: "100%",
  },
  active: {
    borderRadius: 10,
    backgroundColor: "#313131",
  },
});

export default NavBar;
