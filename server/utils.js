import os from 'os'

/**
 * Calculates the CPU usage as a percentage for the next second.
 * @return {Promise<number>} Returns a promise of the percentage of the CPU
 * usage for the next second.
 */
export function getCpuUsage () {
  const stats1 = getCpuInfo()
  const startIdle = stats1.idle
  const startTotal = stats1.total

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      const stats2 = getCpuInfo()
      const endIdle = stats2.idle
      const endTotal = stats2.total

      const idle = endIdle - startIdle
      const total = endTotal - startTotal
      const perc = idle / total

      const cpuUsage = Math.round(100 * (1 - perc))
      resolve(cpuUsage)
    }, 1000)
  })

  return promise
}

/**
 * Calculates the necessary information to help find the CPU usage.
 * @return {{ idle: number, total: number}} Returns the CPU usage that is idle
 * and the total CPU usage.
 */
function getCpuInfo () {
  const cpus = os.cpus()

  let user = 0
  let nice = 0
  let sys = 0
  let idle = 0
  let irq = 0
  let total = 0

  for (const cpu in cpus) {
    // eslint-disable-next-line no-prototype-builtins
    if (!cpus.hasOwnProperty(cpu)) continue
    user += cpus[cpu].times.user
    nice += cpus[cpu].times.nice
    sys += cpus[cpu].times.sys
    irq += cpus[cpu].times.irq
    idle += cpus[cpu].times.idle
  }

  total = user + nice + sys + idle + irq

  return {
    idle,
    total
  }
}
