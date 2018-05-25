export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_READING = 'ADD_READING';

// import sample from '../config/Data'; // Not sure why this doesn't work.

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
          name: 'Spider Sensor',
          unit: 'each'
        },
      },
      allIds: ['11', '12', '13']
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

// convenience functions inspired by: https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5

const ids_by_unique_key = (key) => (data) =>  // make index(data) for key
      Object.values(data)
      .reduce((index, row) => {
        index[row[key]] = row.id;
        return index
      }, {})

const ids_by_nonunique_key = (key) => (data) => 
      Object.values(data)
      .reduce((index, row) => {
        previous = index[row[key]];
        if (previous) {
          index[row[key]] = [...previous, row.id];
        } else {
          index[row[key]] = [row.id]; // There's bound to be a better way
        }
        return index
      }, {})

export const ids_by_site = ids_by_nonunique_key('site')
