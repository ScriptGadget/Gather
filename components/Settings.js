import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Card } from 'react-native-elements';

import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';


import { onSignOut } from "../config/Auth";
import { syncUpdates } from "../redux/Actions";

class Settings extends Component {

  render() {
    return (
      <View style={styles.settingsContainer}>
        <Card style={styles.controlsCard}>        
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign Out"
            onPress={() => {
              onSignOut().then(() => this.props.navigation.navigate("SignedOut"))
            }}
          />
        </Card>
        <Card style={styles.controlsCard}>
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Send Readings"
            onPress={() => this.props.syncReadings(this.props.newReadings)}
          />      
          <Text>Last Sent:</Text>
          <Text>{this.props.lastSynced ? new Date(lastSynced).toUTCString() : "Unknown"}</Text>
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
  controlsCard: {
    paddingVertical: 50,
    height: 250,
    justifyContent: 'space-between',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
