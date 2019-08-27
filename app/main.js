import CarController from "./Controllers/CarController.js";
import JobController from "./Controllers/JobController.js";


class App {
    constructor() {
        this.controllers = {
            carCtrl: new CarController(),
            jobController: new JobController()
        }
    }
}

window['app'] = new App()