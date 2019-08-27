import House from "../Models/House.js";

// @ts-ignore
let _houseApi = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/houses"
})

//Private
let _state = {
  houses: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
  houses: []
}

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}

export default class HouseService {
  //NOTE adds the subscriber function to the array based on the property it is watching
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get House() {
    return _state.houses.map(h => new House(h))
  }

  getApiHouse() {
    _houseApi.get()
      .then(res => {
        let houseData = res.data.data.map(h => new House(h))
        _setState("houses", houseData)
      })
      .catch(err => {
        console.error(err)
      })
  }

  addHouse(newData) {
    _houseApi.post('', newData)
      .then(res => {
        _state.houses.push(res.data.data)
        _setState("houses", _state.houses)
      })
      .catch(err => {
        console.error(err)
      })
  }
  deleteHome(id) {
    _houseApi.delete(id)
      .then(res => {
        let index = _state.houses.findIndex(h => h._id == id)
        _state.houses.splice(index, 1)
        _setState("houses", _state.houses)
      })
  }
}