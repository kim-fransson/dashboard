import { createServer } from 'miragejs'

export function makeServer({ environment = 'test' }) {
  return createServer({
    environment,
    models: {},
    routes() {
      this.namespace = 'api'
    },
    seeds(server) {},
    factories: {}
  })
}
