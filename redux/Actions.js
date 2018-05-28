export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_READING = 'ADD_READING';

// So we'll just include it here.
export const sample = {
  entities: {
    sites: {
      byId: {
        '1': {
          id: '1',
          name: 'Markarth',
          location: {latitude: 31.8767366, longitude: -102.4135945},
          description: "Site of an old Dwemer city."
        },
        '2': {
          id: '2',
          name: 'Riften',
          location: {latitude: 35.2021668, longitude: -101.9450282},
          description: "Once a bustling trade hub, now a decaying backwater full of thieves."
        },
        '3': {
          id: '3',
          name: 'Riverwood',
          location: {latitude: 39.2188492, longitude: -121.0887236},
          description: "A beautiful, sleepy mountain village."
        },
      },
      allIds: ['1', '2', '3']
    },
    machines: {
      byId: {
        '5': {
          site: '2',
          id: '5',
          name: 'Water Well',
        },
        '6': {
          site: '2',
          id: '6',
          name: 'Ratway',
        },
        '7': {
          site: '1',
          id: '7',
          name: 'Dwemer Forge',
        },
      },
      allIds: ['5', '6', '7']
    },
    points: {
      byId: {
        '11': {
          machine: '5',
          id: '11',
          name: 'Dipstick',
          unit: 'feet'
        },
        '12': {
          machine: '5',
          id: '12',
          name: 'Salinity Probe',
          unit: 'ppm'
        },
        '13': {
          machine: '7',
          id: '13',
          name: 'Spider Counter',
          unit: 'each'
        },
      },
      allIds: ['11', '12', '13']
    },
    newReadings: {
      byId: {
      },
      allIds: []
    },
    history: {
      byId: {
        '33' : {
          id: '33',
          point: '13',
          value: '11',
          mark: 1526100200336
        },        
        '32' : {
          id: '32',
          point: '11',
          value: '2.9',
          mark: 1526890286736
        },
        '31' : {
          id: '31',
          point: '11',
          value: '3.0',
          mark: 1526563933068
        },
      },
      allIds: ['33','32','31']
    }
  }
}

export function getData() {
  return dispatch => {
    //Make API Call
    //delay the retrieval [Sample reasons only]
    setTimeout(() => {
      const data = sample;
      dispatch({ type: DATA_AVAILABLE, data: data });
    }, 2000);
  };
}

export function addReading(reading) {
  return dispatch => {
      return dispatch({ // return is just for easy unit testing
        type: ADD_READING,
        reading: reading
      });
  }
}
