class historyRouter {
  constructor () {
    this.routes = {}

    // 在初始化时监听popstate事件
    this._bindPopState()
  }

  init (path) {
    history.replaceState({ path: path }, null, path)
    this.routes[path] && this.routes[path]()
  }

  // 添加路由
  route (path, cb) {
    this.routes[path] = cb || function () {}
  }

  go (path) {
    history.pushState({ path: path }, null, path)
    this.routes[path] && this.routes[path]()
  }

  _bindPopState () {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path
      this.routes[path] && this.routes[path]()
    })
  }
}

function changeBgColor (color) {
  document.body.style.backgroundColor = color || 'red'
  return color
}

const router = new historyRouter()
router.init(location.pathname)

router.route('/', () => {
  changeBgColor('red')
})

router.route('/blue', () => {
  changeBgColor('blue')
})

router.route('/green', () => {
  changeBgColor('green')
})

const ul = document.querySelector('#history')
ul.addEventListener('click', e => {
  e.preventDefault()
  if (e.target.tagName == 'A') {
    router.go(e.target.getAttribute('href'))
  }
})