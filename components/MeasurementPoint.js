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
    const n = data.entities.newReadings;
    const newReadings = Data.ids_by_point(n.byId)[point.id];
    const h = data.entities.readings;
    const history = Data.ids_by_point(h.byId)[point.id];
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
            {newReadings ? newReadings.sort((a,b) => n.byId[b].mark - n.byId[a].mark).map((readingId, i) => (
                <ListItem
                  key={i}
                  leftIcon={{ name: 'av-timer' }}
                  title={`${point.name}`}
              subtitle={`${n.byId[readingId].value} ${point.unit} [${new Date(n.byId[readingId].mark).toUTCString()}]`}
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

        <Text>History</Text>
        <ScrollView>
          <List>
            {history ? history.sort((a,b) => h.byId[b].mark - h.byId[a].mark).map((historyId, i) => (
                <ListItem
                  key={i}
                  leftIcon={{ name: 'av-timer' }}
                  title={`${point.name}`}
              subtitle={`${h.byId[historyId].value} ${point.unit} [${new Date(h.byId[historyId].mark).toUTCString()}]`}
                  hideChevron
                />
            )) : <ListItem
                   key={'0'}
                   leftIcon={{ name: 'cancel'}}
                   title='No History Found'
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
