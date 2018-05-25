import React, { Component } from 'react';
import { Text, TextInput, ScrollView, View } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';

import { connect } from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';

import * as Actions from '../redux/Actions'; //Import your actions

class MeasurementPoint extends Component {
  _handleSubmit = point => {
    return event => {
      console.log(`_handleSubmit(${point}, ${event.nativeEvent.text})`);
      this.props.addReading({
        point: point,
        value: event.nativeEvent.text
      });
    };
  };

  render() {
    const { point } = this.props.navigation.state.params;
    const data = this.props.data;
    return (
      <ScrollView>

        <TextInput
          keyboardType="numeric"
          autoCapitalize="words" // solves a Samsung 6 keyboard issue where the decimal doesn't appear
          placeholder={`Add a new ${data.pointsById[point].name} reading.`}
          onSubmitEditing={this._handleSubmit(point)}
          style={{ width: 300, height: 44, padding: 8 }}
        />

        <Text>Readings Waiting to Send</Text>
        <ScrollView>
          <List>
            {data.newReadings.map(reading => (
              <ListItem
                key={reading}
                leftIcon={{ name: 'av-timer' }}
                title={`${data.pointsById[reading.point].name}`}
                subtitle={`${reading.value} ${data.pointsById[reading.point].unit}`}
              />
            ))}
          </List>
        </ScrollView>

      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementPoint);
