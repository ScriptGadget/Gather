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
        value: event.nativeEvent.text,
        timestamp: Date.now()
      });
    };
  };

  render() {
    const data = this.props.data;
    const point = data.entities.points.byId[this.props.navigation.state.params.point];
    const newReadings = Actions.ids_by_point(data.entities.newReadings.byId)[point.id];
    return (
      <ScrollView>
        <TextInput
          keyboardType="numeric"
          autoCapitalize="words" // solves a Samsung 6 keyboard issue where the decimal doesn't appear
          placeholder={`Add a new ${point.name} reading.`}
          onSubmitEditing={this._handleSubmit(point.id)}
          style={{ width: 300, height: 44, padding: 8 }}
        />

        <Text>Readings Waiting to Send</Text>
        <ScrollView>
          <List>
            {newReadings ? newReadings.map((readingId, i) => (
              <ListItem
                key={i}
                leftIcon={{ name: 'av-timer' }}
                title={`${point.name}`}
                subtitle={`${data.entities.newReadings.byId[readingId].value} ${point.unit}`}
                hideChevron
              />
            )) : <ListItem
                 key={'0'}
                 leftIcon={{ name: 'cancel'}}
                 title='No Unsent Readings Found'
                 hideChevron
              />}
          </List>
        </ScrollView>

      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementPoint);
