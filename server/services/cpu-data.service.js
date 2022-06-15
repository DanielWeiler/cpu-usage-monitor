import os from 'os-utils'

/**
 * Gets the CPU usage of the host device at the time this function is called.
 * @returns {number} Returns the CPU usage as a percentage.
 */
async function getCpuUsage () {
  const usageValue = Math.round(
    100 * (await new Promise((resolve) => os.cpuUsage(resolve)))
  )
  const cpuUsage = {
    value: usageValue
  }
  return cpuUsage
}

export default { getCpuUsage }
