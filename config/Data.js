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
        previous = index['' + row[key]];
        if (previous) {
          index['' + row[key]] = [...previous, row.id];
        } else {
          index['' + row[key]] = [row.id]; // There's bound to be a better way
        }
        return index
      }, {})

export const ids_by_site = ids_by_nonunique_key('siteId')

export const ids_by_machine = ids_by_nonunique_key('machineId')

export const ids_by_point = ids_by_nonunique_key('pointId')

// Sample Data for testing
export const newReadingsSample = {
      "newReadings" : {
        "byId": {
          "1" : {
            id: 1,
            pointId: 1,
            value: 23.6,
            mark: 1528401007777
           }
        },
      "allIds": [1]
    }
}

export const sample = {
  "entities": {
    "sites": {
      "byId": {
        "1": {
          "name": "Mesa Flats",
          "description": "Example Panhandle site.",
          "location": {
            "lat": 35.1260368,
            "lng": -102.0157754
          },
          "id": 1
        },
        "2": {
          "name": "Oglala Draw",
          "description": "Example site with two Machines.",
          "location": {
            "lat": 34.5685931,
            "lng": -101.9881576
          },
          "id": 2
        }
      },
      "allIds": [
        "1",
        "2"
      ]
    },
    "machines": {
      "byId": {
        "1": {
          "name": "Water Well",
          "id": 1,
          "siteId": 1
        },
        "2": {
          "name": "Tar Pit",
          "id": 2,
          "siteId": 2
        },
        "3": {
          "name": "Compressor",
          "id": 3,
          "siteId": 2
        }
      },
      "allIds": [
        "1",
        "2",
        "3"
      ]
    },
    "points": {
      "byId": {
        "1": {
          "name": "Salinity Probe",
          "unit": "ppm",
          "id": 1,
          "machineId": 1
        },
        "2": {
          "name": "Dipstick",
          "unit": "feet",
          "id": 2,
          "machineId": 2
        },
        "3": {
          "name": "Battery",
          "unit": "volts",
          "id": 3,
          "machineId": 3
        },
        "4": {
          "name": "Pressure",
          "unit": "psi",
          "id": 4,
          "machineId": 3
        }
      },
      "allIds": [
        "1",
        "2",
        "3",
        "4"
      ]
    },
    "readings": {
      "byId": {
        "1": {
          "value": 120,
          "mark": "2018-05-22T01:50:45.734Z",
          "id": 1,
          "pointId": 1
        },
        "2": {
          "value": 131,
          "mark": "2018-05-24T02:15:01.613Z",
          "id": 2,
          "pointId": 1
        },
        "3": {
          "value": 3.5,
          "mark": "2018-05-23T10:03:45.734Z",
          "id": 3,
          "pointId": 2
        },
        "4": {
          "value": 3.7,
          "mark": "2018-05-25T03:11:01.613Z",
          "id": 4,
          "pointId": 2
        },
        "5": {
          "value": 22.1,
          "mark": "2018-05-23T10:03:45.734Z",
          "id": 5,
          "pointId": 3
        },
        "6": {
          "value": 23.05,
          "mark": "2018-05-25T03:11:01.613Z",
          "id": 6,
          "pointId": 3
        },
        "7": {
          "value": 82,
          "mark": "2018-05-23T10:03:45.734Z",
          "id": 7,
          "pointId": 4
        },
        "8": {
          "value": 87,
          "mark": "2018-05-25T03:11:01.613Z",
          "id": 8,
          "pointId": 4
        }
      },
      "allIds": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ]
    }
  }
}

