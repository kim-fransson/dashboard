import { faker } from '@faker-js/faker'

export function generateRandomAmounts(n, min, max) {
  const amounts = []
  for (let i = 0; i < n; i++) {
    const amount = Number.parseFloat(faker.finance.amount({ min, max, dec: 2 }))
    amounts.push(amount)
  }
  return amounts
}
