import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';
import * as Data from '../config/Data';

class Machine extends Component {
  onLearnMore = data => {
    return point => {
      this.props.navigation.navigate('MeasurementPoint', { point: point, name: data.entities.points.byId[point].name });
    }
  };

  render() {
    const data = this.props.data;
    const machine =
          data.entities.machines.byId[this.props.navigation.state.params.machine];
    const points = Data.ids_by_machine(data.entities.points.byId)[machine.id];

    return (
      <ScrollView>
        <Text>
          {machine.name}
        </Text>
        <List>
          {points ? points.map((point, i) => (
            <ListItem
              key={i}
              leftIcon={{ name: 'timeline' }}
              title={`${data.entities.points.byId[point].name}`}
              onPress={() => this.onLearnMore(data)(point)}
            />
          )) : <ListItem
                 key={'0'}
                 leftIcon={{ name: 'cancel'}}
                 title='No Measurement Points Found'
                 hideChevron
              />}
        </List>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Machine);
