import { faker } from '@faker-js/faker'
import { createServer, Model, Factory } from 'miragejs'

export function makeServer({ environment = 'test' }) {
  return createServer({
    environment,
    models: {
      numbers: Model
    },
    routes() {
      this.namespace = 'api'
      this.get('/numbers', () => {
        return {
          numbers: [
            {
              id: 1,
              name: 'Total income',
              value: faker.finance.amount({
                min: 1000,
                max: 99999,
                dec: 2,
                symbol: '$',
                autoFormat: true
              }),
              compareToLastMonth: {
                sign: faker.helpers.arrayElement(['+', '-']),
                value: faker.finance.amount({ min: 0, max: 25, dec: 2 })
              }
            },
            {
              id: 2,
              name: 'Profit',
              value: faker.finance.amount({
                min: 1000,
                max: 9999,
                dec: 2,
                symbol: '$',
                autoFormat: true
              }),
              compareToLastMonth: {
                sign: faker.helpers.arrayElement(['+', '-']),
                value: faker.finance.amount({ min: 0, max: 25, dec: 2 })
              }
            },
            {
              id: 3,
              name: 'Total views',
              value: faker.finance.amount({
                min: 10000,
                max: 999999,
                dec: 0,
                autoFormat: true
              }),
              compareToLastMonth: {
                sign: faker.helpers.arrayElement(['+', '-']),
                value: faker.finance.amount({ min: 0, max: 25, dec: 2 })
              }
            },
            {
              id: 4,
              name: 'Conversion rate',
              value: faker.finance.amount({
                min: 1,
                max: 25,
                dec: 2
              }),
              postfix: '%',
              compareToLastMonth: {
                sign: faker.helpers.arrayElement(['+', '-']),
                value: faker.finance.amount({ min: 0, max: 25, dec: 2 })
              }
            }
          ]
        }
      })
    },
    seeds(server) {},
    factories: {}
  })
}
