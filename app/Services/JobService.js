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
      .catch(err => {
        console.error(err)
      })
  }

  addJob(newData) {
    _jobApi.post('', newData)
      .then(res => {
        _state.jobs.push(res.data.data)
        _setState('jobs', _state.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteJob(id) {
    _jobApi.delete(id)
      .then(res => {
        let index = _state.jobs.findIndex(j => j._id == id)
        _state.jobs.splice(index, 1)
        _setState('jobs', _state.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

  bid(id) {
    let job = _state.jobs.find(j => j._id == id)
    job.rate++

    _jobApi.put(id, { rate: job.rate })
      .then(res => {
        _setState('jobs', _state.jobs)
      })
      .catch(err => {
        console.log(err)
      })
  }
}