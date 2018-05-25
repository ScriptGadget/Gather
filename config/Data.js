const sitesById = {
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
};

const machinesById = {
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
};

const pointsById = {
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
};

export const data = {
  sitesById: sitesById,
  machinesById: machinesById,
  pointsById: pointsById,
  sites: ['1', '2', '3'],
  machines: ['5', '6'],
  points: ['11', '12'],
  newReadings: []
};
