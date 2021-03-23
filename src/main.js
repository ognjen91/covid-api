import { createApp } from 'vue'
import { store } from './store'

import router from './router'
import 'es6-promise/auto'
import toastr from 'toastr'

import { createI18n } from 'vue-i18n'
import messages from './translations'

      const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en-GB',
        messages,
        datetimeFormats: {
          'en-GB': {
            long: {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }
          },
        }
      })

import App from './App.vue'

const app = createApp(App)

//using vue-router for routing
app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
