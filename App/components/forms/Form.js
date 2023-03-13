import React from "react";
import { StyleSheet, View } from 'react-native';
import { Formik } from "formik";

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
  return ( 
    <View style={styles.container}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container : { 
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  }
})

export default AppForm;
