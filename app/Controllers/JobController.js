import JobService from "../Services/JobService.js";

let _jobService = new JobService

function _draw() {
  let template = ``
  let job = _jobService.Jobs

  job.forEach(j => template += j.Template)

  document.getElementById('job-cards').innerHTML = template
}

export default class JobController {
  constructor() {
    // console.log('hello from jc')
    //NOTE Register all subscribers
    _jobService.addSubscriber('jobs', _draw)

    //NOTE Retrieve data
    _jobService
  }
}