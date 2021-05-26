import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import { DynamicCollage, StaticCollage } from "react-native-images-collage";
import CachedImage from "../../helpers/CachedImage";

export default function Photos() {
  const [images, setImage] = useState([]);
  // const [images1, setImage1] = useState([]);
  // const [matrix, setMatrix] = useState([]);
  // const [matrix1, setMatrix1] = useState([]);

  const createMatrix = (photos) => {
    let firstMatrix = [
      photos.hits.slice(0, 7),
      photos.hits.slice(7, 14),
      photos.hits.slice(14, 21),
    ];
    let secondMatrix = firstMatrix.map((matrix) => [
      [matrix[0], matrix[1], matrix[2]],
      matrix[3],
      [matrix[4], matrix[5], matrix[6]],
    ]);
    // secondMatrix.map(matrix=>{
    //   console.log('-------------------------');
    return secondMatrix;
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=red+cars&image_type=photo&per_page=21`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const photos = await response.json();
        photos && setImage(createMatrix(photos));
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
      }}
    >
      <ScrollView>
        <View style={styles.album}>
          {images &&
            images.map((matrix) => {
              return matrix.map((image, index) => {
                console.log(index);
                if (index == 1 || index == 3 || index == 5) {
                  return (
                    <CachedImage
                      key={image.index}
                      title={image.id}
                      source={image.webformatURL}
                      style={styles.first}
                      alt={image.tags}
                    />
                  );
                } else {
                  console.log(image.length)
                  return (

                    <View style={styles.column}>
                      {image.length && image.map((imgs) => (
                        <CachedImage
                          key={imgs.index}
                          title={imgs.id}
                          source={imgs.webformatURL}
                          style={styles.second}
                          alt={imgs.tags}
                        />
                      ))}
                    </View>
                  );
                }
              });
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  first: {
    width: 220,
    height: 270,
    // borderWidth: 4,
    borderColor: "gray",
  },
  second: {
    minWidth: 90,
    height: 90,
    // borderWidth: 4,
    borderColor: "gray",
  },
  album: {
    width: 400,
    height: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    minWidth: 90,
    height: 270,
    borderColor: "gray",
    flex: 1,
    flexDirection: "column",
  },
});
