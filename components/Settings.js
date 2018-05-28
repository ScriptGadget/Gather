import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';

import { Card } from 'react-native-elements';

import * as Auth from "../config/Auth";

class SignOut extends Component {
  handlePress = () => {
    Auth.onSignOut();
    this.props.navigation.navigate('SignedOut');    
  }
  
  render() {
    return (
      <View style={styles.settingsContainer}>
        <Card style={styles.signOutCard}>        
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign Out"
            onPress={this.handlePress}
          />
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  settingsContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    flex: 1,    
  },
  signOutCard: {
    paddingVertical: 50,
    height: 100
  }
});

export default SignOut;
