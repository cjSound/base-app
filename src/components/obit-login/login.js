import Login from './obit-login.vue'
import Vue from 'vue'


Login.newInstance = (options) => {
  var _props = Object.assign({}, options)
  var v = new Vue({
    render(h) {
      return h(Login, {
        props: _props,
        on: {
          'on-close': (cancel) => {
            console.log('TCL: render -> this', this)

            document.body.removeChild(component.$el)
            if (options.callback && !cancel) {
              options.callback()
            } else if (options.cancel) {
              options.cancel()
            }
            options.onRemove()
          }
        }
      })
    }
  })

  const component = v.$mount()
  document.body.appendChild(component.$el)
  const modal = v.$children[0]

  return {
    show() {
      modal.visible = true
    },
    close() {
      document.body.removeChild(component.$el)
      modal.cancel = true
      modal.visible = false
      modal.onRemove()
    }
  }
}

export default Login
