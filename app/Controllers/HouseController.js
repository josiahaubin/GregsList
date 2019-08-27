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

  addHouse(e) {
    e.preventDefault()

    let form = e.target

    let newData = {
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      imgUrl: form.imgUrl.value,
      levels: form.levels.value,
      year: form.year.value,
      price: form.price.value,
      description: form.description.value
    }

    _houseService.addHouse(newData)
    form.reset()
  }
  delete(id) {
    _houseService.deleteHome(id)
  }
}