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
    _jobService.getApiJobs()
  }

  addJob(e) {
    e.preventDefault()

    let form = e.target

    let newData = {
      company: form.company.value,
      jobTitle: form.jobTitle.value,
      hours: form.hours.value,
      rate: form.rate.value,
      description: form.description.value
    }

    _jobService.addJob(newData)
    form.reset()
  }

  delete(id) {
    if (window.confirm("Are you sure?")) {
      _jobService.deleteJob(id)
    }
  }

  bid(id) {
    _jobService.bid(id)
  }
}