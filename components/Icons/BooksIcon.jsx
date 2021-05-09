import React from "react";
import { StyleSheet, Image } from 'react-native';

function BooksIcon() {
  return (
    <>
      <Image style={styles.stdIcon} source={require('../../images/book.png')} />
    </>
  );
}
const styles = StyleSheet.create({
  stdIcon:{
      width:40,
      height:40
  }
});

export default BooksIcon;
