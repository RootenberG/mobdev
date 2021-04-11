import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import StudyIcon from './StudyIcon';
import TimeIcon from './TimeIcon';

function NavBar(props) {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={()=>props.changePage(true)} style={styles.touchable}>
                <View style={styles.centeredText}>
                    <StudyIcon/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.changePage(false)} style={styles.touchable}>
                <View style={styles.centeredText}>
                    <TimeIcon/>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
  navBar:{
      width:'100%',
      height:'100%',
      flex:1,
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row'
  },
  centeredText:{
      height:'100%',
      flex:0.5,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
  },
  touchable:{
      flex:0.5,
      height:'100%'
  }
});

export default NavBar
