import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import * as Auth from "../config/Auth";

class SignIn extends Component {
  handlePress = () => {
    Auth.onSignIn();
    this.props.navigation.navigate('SignedIn');    
  }

  render() {
    return (
      <View style={styles.signInContainer}>
        <Card>        
          <TextInput
            style={styles.input}
            placeholder="me@example.com"
          />
          <TextInput
            style={styles.input}
            placeholder="password"
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={this.handlePress}
          />
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  signInContainer: {
    paddingVertical: 20
  },
  input: {
    height: 40
  }
});

export default SignIn;
