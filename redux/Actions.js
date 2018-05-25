export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_READING = 'ADD_READING';

// Not sure why this doesn't work.
// import sample from '../config/Data';

// So we'll just include it here.
const normalized = {
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
      },
      allIds: ['5', '6']
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
      },
      allIds: ['11', '12']
    },
    readings: {
      byId: {
      },
      allIds: []
    },
  }
}


export function getData() {
  return dispatch => {
    //Make API Call
    //delay the retrieval [Sample reasons only]
    setTimeout(() => {
      const data = normalized;
      dispatch({ type: DATA_AVAILABLE, data: data });
    }, 2000);
  };
}

export function addReading(reading) {
  return dispatch => {
      dispatch({
        type: ADD_READING,
        reading: reading
      });
  }
}
