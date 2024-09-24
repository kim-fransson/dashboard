export function formatNumber(number, minimumFractionDigits = 2, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(number)
}
