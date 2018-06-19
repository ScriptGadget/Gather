export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_READING = 'ADD_READING';
export const READING_SYNCED = 'READING_SYNCED';

export function getData() {
  return dispatch => {
    //Make API Call
    fetch('http://192.168.1.150:3000/api/Routes/mine/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        data = responseJson["mine"];
        dispatch({ type: DATA_AVAILABLE, data:  data});
      }).catch((error) => {
        console.log("Retrieving Sites - Server not available: " + error);
      });
  };
}

export function addReading(reading) {
  return dispatch => {
      return dispatch({ // this return is just for easy unit testing
        type: ADD_READING,
        reading: reading
      });
  }
}

export function syncReadings(readings) {
  return dispatch => {
    Object.values(readings.byId).map((reading) => { 
      fetch('http://192.168.1.150:3000/api/Readings', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reading)
      }).then((response) => {
        dispatch({ type: READING_SYNCED, readingId: reading.id });
        getData()(dispatch); // check for changes on the server.
      }).catch((error) => {
          console.log("Syncing Readings - Server not available: " + error);
        });
    });
  };
}
