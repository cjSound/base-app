import Login from './login'
import Vue from 'vue'

let _instance
function getInstance(options) {
  _instance = Login.newInstance(options)

  return _instance
}

Login.show = (options = {}) => {
  var i = getInstance(options)

  options.onRemove = () => {
    _instance = null
  }

  i.show()
  return i
}

Login.remove = () => {
  if (!_instance) {
    return false
  }

  const instance = getInstance()

  instance.remove()
}

Vue.$login = Vue.prototype.$login = Login
console.log('login')
export default Login
