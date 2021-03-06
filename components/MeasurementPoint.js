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
        pointId: point,
        value: event.nativeEvent.text,
        mark: Date.now()
      });
      this.props.syncReadings(this.props.newReadings);
    };
  };

  render() {
    const point = this.props.data.entities.points.byId[this.props.navigation.state.params.point];
    const n = this.props.newReadings;
    const newReadings = Data.ids_by_point(n.byId)[point.id];
    const h = this.props.data.entities.readings;
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
            {newReadings ? newReadings.sort((a,b) => new Date(n.byId[b].mark).getTime() - new Date(n.byId[a].mark).getTime()).map((readingId, i) => (
                <ListItem
                  key={i}
                  leftIcon={{ name: 'av-timer' }}
                  title={`${point.name}`}
              subtitle={`${n.byId[readingId].value} ${point.unit} [${n.byId[readingId].mark}]`}
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
        {history ? history.sort((a,b) => new Date(h.byId[b].mark).getTime() - new Date(h.byId[a].mark).getTime()).map((historyId, i) => (
                <ListItem
                  key={i}
                  leftIcon={{ name: 'av-timer' }}
                  title={`${point.name}`}
              subtitle={`${h.byId[historyId].value} ${point.unit} [${h.byId[historyId].mark}]`}
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
