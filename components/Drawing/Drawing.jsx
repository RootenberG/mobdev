import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PieChartCustom from "./PieChart";
import CustomGridExample from "./XYChart";

class Drawing extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      graph: true,
    };
  }

  showGraph(){
    this.setState({
      graph:true
    })
  }
  showDiagram(){
    this.setState({
      graph:false
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.DrawingWrapper}>
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return (
      <>
      <View style={styles.ButtonWrapper}>
        <Button
          style={styles.Button}
          onPress={()=>this.showGraph()}
          title="Graph"
          color={this.state.graph?"#841584":"#977799"}
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          style={styles.Button}
          onPress={()=>this.showDiagram()}
          title="Diagram"
          color={!this.state.graph?"#841584":"#977799"}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <View style={styles.DrawingWrapper}>
        {this.state.graph ? <CustomGridExample /> : <PieChartCustom />}
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  DrawingWrapper: {
    flex: 0.77,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonWrapper:{
    width:100,
    flex:0.1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  Button:{
    width:50,
    height:50,
  },
});

export default Drawing;
