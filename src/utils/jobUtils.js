module.exports = {
  remainingDays(job) {
    const remainingDays = (job["total-hours"] / job["daily-hours"])
  
    const date = new Date(job.created_at)
    const dueDay = date.getDate() + Number(remainingDays)
    const dueDate = date.setDate(dueDay)
    const timeDiffInMs = dueDate - Date.now()
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = (timeDiffInMs / dayInMs).toFixed()

    return dayDiff
  },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}