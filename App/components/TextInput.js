import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";

function AppTextInput({ icon, style, ...otherProps }) {
  return (
    <View style={[styles.container, style ]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[ styles.inputBox, defaultStyles.text]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 5,
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    borderColor : "#d1c9c9",
    borderWidth : 0.5
  },
  icon: {
    marginRight: 10,
    top : 3
  },
  inputBox : {
    flex: 1,
  }
});

export default AppTextInput;