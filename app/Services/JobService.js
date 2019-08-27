import Job from "../Models/Job.js";

let _state = {
  jobs: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
  jobs: []
}

// @ts-ignore
let _jobApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/jobs'
})

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}


export default class JobService {
  constructor() {
    // console.log("hello from js")
  }

  //NOTE adds the subscriber function to the array based on the property it is watching
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Jobs() {
    return _state.jobs.map(j => new Job(j))
  }

  getApiJobs() {
    _jobApi.get()
      .then(res => {
        let jobData = res.data.data.map(j => new Job(j))
        _setState('jobs', jobData)
      })
  }
}