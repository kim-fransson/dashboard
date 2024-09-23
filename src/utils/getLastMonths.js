export function getLastMonths(n) {
  const currentDate = new Date()
  const months = []

  for (let i = 0; i < n; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i)
    const options = { month: 'short', year: 'numeric' }
    months.unshift(monthDate.toLocaleDateString('en-US', options)) // Add to the beginning of the array
  }

  return months
}
