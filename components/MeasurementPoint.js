import React, { Component } from 'react';
import { Text, TextInput, ScrollView, View } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';

import { connect } from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';

import * as Data from '../config/Data';

class MeasurementPoint extends Component {
  _handleSubmit = point => {
    return event => {
      this.props.addReading({
        point: point,
        value: event.nativeEvent.text,
        mark: Date.now()
      });
    };
  };

  render() {
    const data = this.props.data;
    const point = data.entities.points.byId[this.props.navigation.state.params.point];
    const byId = data.entities.newReadings.byId;
    const newReadings = Data.ids_by_point(byId)[point.id];
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
            {newReadings ? newReadings.sort((a,b) => byId[b].mark - byId[a].mark).map((readingId, i) => (
                <ListItem
                  key={i}
                  leftIcon={{ name: 'av-timer' }}
                  title={`${point.name}`}
              subtitle={`${byId[readingId].value} ${point.unit} [${new Date(byId[readingId].mark).toUTCString()}]`}
                  hideChevron
                />
            )) : <ListItem
                   key={'0'}
                   leftIcon={{ name: 'cancel'}}
                   title='No Unsent Readings Found'
                   hideChevron
                 />
            }
          </List>
        </ScrollView>

      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementPoint);
