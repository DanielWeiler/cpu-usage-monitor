import cpuDataService from '../services/cpu-data.service.js'

async function getCpuUsage (req, res, next) {
  try {
    res.json(await cpuDataService.getCpuUsage())
  } catch (error) {
    console.error('Error while getting CPU usage')
    next(error)
  }
}

export default { getCpuUsage }
