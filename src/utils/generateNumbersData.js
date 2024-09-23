import { faker } from '@faker-js/faker'

export function generateNumbersData(id, name, min, max, dec, prefix = '', postfix = '') {
  return {
    id: id,
    name: name,
    value: Number.parseFloat(
      faker.finance.amount({
        min: min,
        max: max,
        dec: dec,
        autoFormat: false
      })
    ),
    postfix,
    prefix,
    compareToLastMonth: {
      sign: faker.helpers.arrayElement(['+', '-']),
      value: faker.finance.amount({ min: 0, max: 25, dec: 2 })
    }
  }
}
