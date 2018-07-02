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

export const ids_by_site = ids_by_nonunique_key('siteId')

export const ids_by_machine = ids_by_nonunique_key('machineId')

export const ids_by_point = ids_by_nonunique_key('pointId')
