export default class Job {
  constructor(data) {
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }

  get Template() {
    return `
      <div class="col-4">
        <h5>${this.company} - ${this.jobTitle}</h5>
        <h6>Hours: ${this.hours} - Hourly Rate: ${this.rate}</h6>
        <p>${this.description}</p>
      </div>
    `
  }
}