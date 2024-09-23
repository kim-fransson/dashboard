import { createServer, Model, Factory } from 'miragejs'
import { generateNumbersData } from '@/utils/generateNumbersData'
import { getLastMonths } from './utils/getLastMonths'
import { generateRandomAmounts } from './utils/generateRandomAmounts'

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
                label: 'My First dataset',
                backgroundColor: '#5f64e2',
                borderColor: '#696ffb',
                pointBackgroundColor: '#696ffb',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [2201, 2865, 1762, 1591, 1749, 2745]
              }
            ]
          }
        }
      })
    },
    seeds(server) {},
    factories: {}
  })
}
