// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases as defaultAliases } from 'vuetify/iconsets/mdi'

import stripe from '@/assets/stripe.svg'
import shopify from '@/assets/shopify.svg'
import zapier from '@/assets/zapier.svg'
import sun from '@/assets/sun.svg'
import moon from '@/assets/moon.svg'
import smile from '@/assets/smile.svg'

const aliases = {
  ...defaultAliases,
  stripe,
  shopify,
  zapier,
  sun,
  moon,
  smile
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    aliases
  }
})
