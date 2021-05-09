import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import NavBar from "./components/NavBar";
import * as ScreenOrientation from "expo-screen-orientation";

import Drawing from "./components/Drawing/Drawing";
import Books from "./components/Books";


export default function App() {
  const [page, setPage] = useState("home");
  const [orientation, setOrient] = useState("portrait");
  const changePage = (pageName) => {
    setPage(pageName);
  };
  let activePage;

  if (page === "home") {
    activePage = (
      <>
        <View style={styles.container}>
          <Text style={styles.textInfo}>
            Савічев Денис{"\n"}Група ІВ-81{"\n"}ЗК ІВ-81 8123
          </Text>
          <StatusBar style="auto" />
        </View>
      </>
    );
  } else if (page === "graph") {
    activePage = (
      <>
        <View style={styles.container}>
          <Drawing />
          <StatusBar style="auto" />
        </View>
      </>
    );
  } else if (page === "books") {
    activePage = (
      <>
        <View style={styles.container}>
          <Books />
          <StatusBar style="auto" />
        </View>
      </>
    );
  } else {
    activePage = (
      <>
        <View style={styles.container}>
          <Text style={styles.textInfo}>
            Савічев Денис{"\n"}Група ІВ-81{"\n"}ЗК ІВ-81 8123
          </Text>
          <StatusBar style="auto" />
        </View>
      </>
    );
  }

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  });

  Dimensions.addEventListener("change", () => {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    setOrient(isPortrait() ? "portrait" : "landscape");
  });

  return (
    <>
      {activePage}
      <View
        style={
          orientation === "portrait"
            ? styles.navBarPortrait
            : styles.navBarLandscape
        }
      >
        <NavBar onPage={page} changePage={changePage} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.92,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navBarPortrait: {
    width: "100%",
    height: "100%",
    flex: 0.1,
  },
  navBarLandscape: {
    width: "100%",
    height: "100%",
    flex: 0.2,
  },
  textInfo: {
    textAlign: "center",
  },
});
