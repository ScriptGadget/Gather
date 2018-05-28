import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { onSignIn } from "../config/Auth";

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {user: '', pass: ''};

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
  }

  handleUser(event) {
    this.setState({user: event.target.value});
  }
  
  handlePass(event) {
    this.setState({pass: event.target.value});
  }

  render() {
    return (
      <View style={styles.signInContainer}>
        <Card>        
          <TextInput
            style={styles.input}
            placeholder="me@example.com"
            autoCapitalize="none"
            onChange={this.handleUser}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChange={this.handlePass}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => {
              onSignIn(this.state.user, this.state.pass).then(() => this.props.navigation.navigate("SignedIn"))
            }}
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
