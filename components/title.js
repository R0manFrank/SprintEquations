import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = () => {
  return (
    <View style={styles.titleBox}>
      <Text style={styles.title}>Sprint Equations</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },

  titleBox: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Title;
