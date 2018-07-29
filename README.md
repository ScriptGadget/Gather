# Gather - (Until we have a new name, fieldguage.com is available)

Gather is a a simple data gathering app for iOS and Android.

## Introduction

This app solves the problem of gathering measurements from wells where
there may be instruments which are not online and in locations where there
may be no cell data service.

Pumpers follow a route, shown on a map to each site, where they can
enter readings for each measurement point at the site. Measurement
Points are grouped to a particular piece of equipment, e.g. a tank or
a pump. Each piece of equipment might have multiple things to
measure. Examples might include a dipstick and a subtractive scale for
a tank, or a pressure guage and flow meter on a compressor.

## To Start Developing

Setup a [node.js development](https://nodejs.org/en/) environment.

Clone this repository.

Assuming the repository is in a directory named 'Gather'

```
cd Gather
npm install
exp start
```

Install the [expo app](https://expo.io/@czheng11/mobile-app) on your
mobile device.

Open the app and scan the barcode displayed by `exp start` 

Enjoy.


## Architecture

This system has three pieces.

+ [Gather](https://bitbucket.org/Procrastes/gather) - the app that
runs on mobile devices. This repository.

+ [Store](https://bitbucket.org/Procrastes/store) - the backend server
which manages user logins, route information and collects readings
from Gather.

+ Analyze - a system used by Operators to analyze readings from
  Pumpers and automated remote sensors. Analyze also manages and
  creates all routes and Pumper accounts. Discussion of Analyze is
  beyond the scope of this document.

Both Gather and Store are written in JavaScript. Analyze is writtin in C#.

Gather is a
[React Native](https://facebook.github.io/react-native/)application,
which uses
[https://react-native-training.github.io/react-native-elements/](React
Native Elements), [Redux](https://redux.js.org/) and
[Redux-Persist](https://github.com/rt2zz/redux-persist). Gather was
created using Expo.

Store is a [Loopback](https://loopback.io/getting-started/)
application.


## API

The Gather application talks to the Store server over HTTPS using a
REST interface. Gather uses three endpoints.

Login:


    POST https://store.fieldguage.com/Pumpers

JSON BODY
  
    {
    "email": "test@example.com",
    "password", "badpass"
    }

Returns a JSON object containing user information and the access_token
as "id"

    {
    "id": "Ez1OTRFfQ2r6ETEY6ZoFYk6jM160TFuU061aKsyxZF0bissRYjVBVZ8TyRoFRbxY",
    "ttl": 1209600,
    "created": "2018-07-27T21:36:01.664Z",
    "userId": "5283d7d9-0d0d-4e10-ba56-28621f4c934c"
    }

Retrieve the Route

    GET https://store.fieldguage.com/Routes/mine?access_token=abc123


Returns a JSON object containing the sites on a Pumper's route, the
Machines at those sites, the Measurememnent Points on those machines
and any previous readings for those Measurement Points. The
information is normalized in the style of the normalizr Node library,
but this project does not need or use normalizr. Note that each
ID("id) is a a UUID. These are created by the Analyze system for all
entities except Readings. Readings are created on the Gather system
and Gather creates a temporary "pointId". The Store system then
assigns an ID which is also a UUID. This becomes the permanent ID for
that reading. In the future, the Gather system may just assign the
actual ID and the pointID may no longer be used. For this reason, do
not write any code depending on the existance of a pointID. 

Returns a 401 error if the access_token is missing or invalid.

```
{
  "mine": {
    "entities": {
      "sites": {
        "byId": {
          "4ff02671-ab30-4e3e-a2cc-da2403d1e3a3": {
            "id": "4ff02671-ab30-4e3e-a2cc-da2403d1e3a3",
            "name": "Mesa Flats",
            "description": "Example Panhandle site.",
            "location": {
              "lat": 35.1260368,
              "lng": -102.0157754
            }
          },
          "6601c3f3-11e3-43ef-9eac-dc3cdca1d37b": {
            "id": "6601c3f3-11e3-43ef-9eac-dc3cdca1d37b",
            "name": "Oglala Draw",
            "description": "Example site with two Machines.",
            "location": {
              "lat": 34.5685931,
              "lng": -101.9881576
            }
          }
        },
        "allIds": [
          "4ff02671-ab30-4e3e-a2cc-da2403d1e3a3",
          "6601c3f3-11e3-43ef-9eac-dc3cdca1d37b"
        ]
      },
      "machines": {
        "byId": {
          "2cc12d0e-390d-4a06-943d-578940d600da": {
            "id": "2cc12d0e-390d-4a06-943d-578940d600da",
            "name": "Tar Pit",
            "siteId": "6601c3f3-11e3-43ef-9eac-dc3cdca1d37b"
          },
          "5391d00e-6bde-492f-b245-7f61c6b21047": {
            "id": "5391d00e-6bde-492f-b245-7f61c6b21047",
            "name": "Compressor",
            "siteId": "6601c3f3-11e3-43ef-9eac-dc3cdca1d37b"
          },
          "9beb6dab-c385-4453-8a2e-a7df68271d70": {
            "id": "9beb6dab-c385-4453-8a2e-a7df68271d70",
            "name": "Water Well",
            "siteId": "4ff02671-ab30-4e3e-a2cc-da2403d1e3a3"
          }
        },
        "allIds": [
          "2cc12d0e-390d-4a06-943d-578940d600da",
          "5391d00e-6bde-492f-b245-7f61c6b21047",
          "9beb6dab-c385-4453-8a2e-a7df68271d70"
        ]
      },
      "points": {
        "byId": {
          "035d720e-66a9-41b9-b8ef-de611ed84a7e": {
            "id": "035d720e-66a9-41b9-b8ef-de611ed84a7e",
            "name": "Battery",
            "unit": "volts",
            "machineId": "5391d00e-6bde-492f-b245-7f61c6b21047"
          },
          "38e1d02d-4ed3-47ca-820a-eb486d3e4988": {
            "id": "38e1d02d-4ed3-47ca-820a-eb486d3e4988",
            "name": "Salinity Probe",
            "unit": "ppm",
            "machineId": "9beb6dab-c385-4453-8a2e-a7df68271d70"
          },
          "42d89c8b-9da9-4242-9f7c-c305c9d55f7b": {
            "id": "42d89c8b-9da9-4242-9f7c-c305c9d55f7b",
            "name": "Dipstick",
            "unit": "feet",
            "machineId": "2cc12d0e-390d-4a06-943d-578940d600da"
          },
          "a5111248-e93a-4141-9bfa-1dca038971d9": {
            "id": "a5111248-e93a-4141-9bfa-1dca038971d9",
            "name": "Pressure",
            "unit": "psi",
            "machineId": "5391d00e-6bde-492f-b245-7f61c6b21047"
          }
        },
        "allIds": [
          "035d720e-66a9-41b9-b8ef-de611ed84a7e",
          "38e1d02d-4ed3-47ca-820a-eb486d3e4988",
          "42d89c8b-9da9-4242-9f7c-c305c9d55f7b",
          "a5111248-e93a-4141-9bfa-1dca038971d9"
        ]
      },
      "readings": {
        "byId": {
          "16b673e4-5f30-4f25-823b-858664c09db8": {
            "id": "16b673e4-5f30-4f25-823b-858664c09db8",
            "value": 82,
            "mark": "2018-05-23T10:03:45.734Z",
            "pointId": "a5111248-e93a-4141-9bfa-1dca038971d9"
          },
          "19f33000-873c-4c6f-ad65-430f4e099b73": {
            "id": "19f33000-873c-4c6f-ad65-430f4e099b73",
            "value": 22.1,
            "mark": "2018-05-23T10:03:45.734Z",
            "pointId": "035d720e-66a9-41b9-b8ef-de611ed84a7e"
          },
          "3121aa12-afa2-43e5-a824-124b8053eafe": {
            "id": "3121aa12-afa2-43e5-a824-124b8053eafe",
            "value": 3.5,
            "mark": "2018-05-23T10:03:45.734Z",
            "pointId": "42d89c8b-9da9-4242-9f7c-c305c9d55f7b"
          },
          "5c66b423-6e60-47ad-b6e9-ecdb1661baba": {
            "id": "5c66b423-6e60-47ad-b6e9-ecdb1661baba",
            "value": 87,
            "mark": "2018-05-25T03:11:01.613Z",
            "pointId": "a5111248-e93a-4141-9bfa-1dca038971d9"
          },
          "61f8d0cb-a798-4919-a168-6276122f3323": {
            "id": "61f8d0cb-a798-4919-a168-6276122f3323",
            "value": 131,
            "mark": "2018-05-24T02:15:01.613Z",
            "pointId": "38e1d02d-4ed3-47ca-820a-eb486d3e4988"
          },
          "7c6739ff-bf7c-4e22-bcc7-1b2533f77098": {
            "id": "7c6739ff-bf7c-4e22-bcc7-1b2533f77098",
            "value": 3.7,
            "mark": "2018-05-25T03:11:01.613Z",
            "pointId": "42d89c8b-9da9-4242-9f7c-c305c9d55f7b"
          },
          "a5111248-e93a-4141-9bfa-1dca038971d9": {
            "id": "a5111248-e93a-4141-9bfa-1dca038971d9",
            "value": 23.05,
            "mark": "2018-05-25T03:11:01.613Z",
            "pointId": "035d720e-66a9-41b9-b8ef-de611ed84a7e"
          },
          "e959f44a-bb37-4a4e-a154-37f301b6f0fc": {
            "id": "e959f44a-bb37-4a4e-a154-37f301b6f0fc",
            "value": 120,
            "mark": "2018-05-22T01:50:45.734Z",
            "pointId": "38e1d02d-4ed3-47ca-820a-eb486d3e4988"
          }
        },
        "allIds": [
          "16b673e4-5f30-4f25-823b-858664c09db8",
          "19f33000-873c-4c6f-ad65-430f4e099b73",
          "3121aa12-afa2-43e5-a824-124b8053eafe",
          "5c66b423-6e60-47ad-b6e9-ecdb1661baba",
          "61f8d0cb-a798-4919-a168-6276122f3323",
          "7c6739ff-bf7c-4e22-bcc7-1b2533f77098",
          "a5111248-e93a-4141-9bfa-1dca038971d9",
          "e959f44a-bb37-4a4e-a154-37f301b6f0fc"
        ]
      }
    }
  }
}
```

Store a new reading


    POST https://store.fieldguage.com/Readings?access_token=abc123

    {
      "value": 23.05,
      "mark": "2018-05-25T03:11:01.613Z",
      "pointId": "035d720e-66a9-41b9-b8ef-de611ed84a7e"
    }


This returns the created reading on success.

Returns a 401 error if the access_token is missing or invalid.


    {
        "id": "a5111248-e93a-4141-9bfa-1dca038971d9",
        "value": 23.05,
        "mark": "2018-05-25T03:11:01.613Z",
        "pointId": "035d720e-66a9-41b9-b8ef-de611ed84a7e"
    }


Store has a much larger API than what is used by Gather. These API
calls are used only by Analyze right now, or for debugging. For more
information see [Store](https://bitbucket.org/Procrastes/store).

## Structure

Gather is a React-Native application which uses Redux for state. This is a
pretty common configuration, so we won't discuss the basics of React, React-Native
or Redux here. For more information, see the links in the Architecture section.

The project directory is organized like this:

.
├── App.js
├── app.json
├── assets
│   ├── expo.symbol.white.png
│   ├── icon.png
│   ├── icons
│   │   ├── app-icon.png
│   │   └── loading-icon.png
│   └── splash.png
├── components
│   ├── Machine.js
│   ├── MeasurementPoint.js
│   ├── Settings.js
│   ├── SignIn.js
│   ├── Site.js
│   └── SiteList.js
├── config
│   ├── Data.js
│   └── Router.js
├── package.json
├── package-lock.json
├── README.md
├── redux
│   ├── Actions.js
│   ├── Reducers.js
│   └── Store.js
├── \_\_samples\_\_
│   └── Sample-data.js
├── \_\_tests\_\_
│   └── Actions-test.js
└── TODO

+ assets - contains static assets like icons and graphics.

+ components - contains React-Native components. Think of each as a "screen" in the mobile application.

+ config - contains routing information (how we move from one screen to another) for react-navigation. You can read more [about react-navigation](https://reactnavigation.org/) at that project's webiste.

+ redux - contains the Actions, Reducers and Store elements of a
  typical Redux project. All of the external API calls are in Actions.

+ \_\_samples\_\_  - contains sample data used for unit tests.

+ \_\_tests\_\_ - contains unit tests based on the [jest framework](https://jestjs.io/).
