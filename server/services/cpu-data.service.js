import os from 'os-utils'

/**
 * Gets the CPU usage of the host device at the time this function is called.
 * @returns {number} Returns the CPU usage as a percentage.
 */
async function getCpuUsage () {
  const cpuUsage = Math.round(100 * await new Promise(resolve => os.cpuUsage(resolve)))
  return cpuUsage
}

export default { getCpuUsage }
