import HouseService from "../Services/HouseService.js";

let _houseService = new HouseService()

function _draw() {
  let template = ``
  let house = _houseService.House

  house.forEach(h => {
    template += h.Template
  })

  document.getElementById('house-cards').innerHTML = template
}

export default class HouseController {
  constructor() {
    //NOTE Register all subscribers
    _houseService.addSubscriber('houses', _draw)

    //NOTE Retrieve data
    _houseService.getApiHouse()
  }
}