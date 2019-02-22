import config from '@/config'

export default {
  methods: {
    async sentryInit () {
      Sentry.init({
        dsn: config.sentryDNS,
        release: "nuxt-app-client@1.0.0"
      });
    }
  }
}
