import { createServer, Model } from 'miragejs'
import { generateNumbersData } from '@/utils/generateNumbersData'
import { getLastMonths } from './utils/getLastMonths'
import { generateRandomAmounts } from './utils/generateRandomAmounts'
import { faker } from '@faker-js/faker'

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
            generateNumbersData(1, 'Total income', 1000, 99999, 2, '$'),
            generateNumbersData(2, 'Profit', 1000, 9999, 2, '$'),
            generateNumbersData(3, 'Total views', 10000, 999999, 0),
            generateNumbersData(4, 'Conversion rate', 1, 25, 2, '', '%')
          ]
        }
      })
      this.get('/sales/overview', () => {
        return {
          data: {
            labels: getLastMonths(10),
            datasets: [
              {
                label: 'Total Revenue',
                data: generateRandomAmounts(10, 10000, 20000),
                borderColor: '#696ffb',
                backgroundColor: '#696ffb',
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 0
              },
              {
                label: 'Total Target',
                data: generateRandomAmounts(10, 10000, 20000),
                borderColor: '#ff9e2b',
                backgroundColor: '#ff9e2b',
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 0
              }
            ]
          }
        }
      })
      this.get('/sales/regions', () => {
        return {
          data: {
            labels: ['Europe', 'America', 'Africa', 'Middle East', 'Pacific', 'Asia'],
            datasets: [
              {
                data: Array.from({ length: 6 }, () => faker.number.int({ min: 1250, max: 3000 }))
              }
            ]
          }
        }
      })
      this.get('/users', () => {
        return {
          data: {
            labels: ['Premium Users', 'Basic Users'],
            datasets: [
              {
                data: [
                  faker.number.int({ min: 500, max: 4000 }),
                  faker.number.int({ min: 200, max: 1000 })
                ],
                borderWidth: 0
              },
              // Background arc (lighter color)
              {
                data: [1],
                borderWidth: 0,
                cutout: '72%'
              }
            ]
          }
        }
      })
      this.get('/integrations', () => {
        return {
          data: [
            {
              application: 'stripe',
              type: 'Finance',
              rate: faker.number.int({ min: 10, max: 90 }),
              profit: Number.parseFloat(faker.finance.amount({ min: 5000, max: 20000, dec: 2 }))
            },
            {
              application: 'zapier',
              type: 'CRM',
              rate: faker.number.int({ min: 10, max: 90 }),
              profit: Number.parseFloat(faker.finance.amount({ min: 5000, max: 20000, dec: 2 }))
            },
            {
              application: 'shopify',
              type: 'Marketplace',
              rate: faker.number.int({ min: 10, max: 90 }),
              profit: Number.parseFloat(faker.finance.amount({ min: 5000, max: 20000, dec: 2 }))
            }
          ]
        }
      })
    },
    factories: {}
  })
}
