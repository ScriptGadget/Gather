import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';

class Machine extends Component {
  onLearnMore = point => {
    this.props.navigation.navigate('MeasurementPoint', { point });
  };

  render() {
    const data = this.props.data;
    const machine =
      data.entities.machines.byId[this.props.navigation.state.params.machine];

    return (
      <ScrollView>
        <Text>
          {machine.name}
        </Text>
        <List>
          {data.entities.points.allIds.map(point => (
            <ListItem
              key={point}
              leftIcon={{ name: 'timeline' }}
              title={`${data.entities.points.byId[point].name}`}
              onPress={() => this.onLearnMore(point)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Machine);
