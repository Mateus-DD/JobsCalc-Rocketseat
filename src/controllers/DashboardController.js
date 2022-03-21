const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/jobUtils')

module.exports = {
  async index(req, res){
    const jobs = await Job.get()

    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    }

    let jobTotalHours = 0

    let updateJobs = jobs.map(job => {
      
      const remaining = JobUtils.remainingDays(job);

      const status = remaining <= 0 ? "done" : "progress";

      // somando a quantidade de status
      statusCount[status] += 1

      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : 'done'


      return {
        ...job,

        status,

        remaining,

        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })

    const freeHours = 24 - jobTotalHours

    res.render('index', { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })

  }
}