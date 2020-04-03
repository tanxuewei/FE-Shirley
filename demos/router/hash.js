class hashRouter {
  constructor () {
    this.routes = {}
    this.currentUrl = ''
  }

  init () {
    window.addEventListener('load', this.refresh.bind(this), false)
    // 检测url变化
    window.addEventListener('hashchange', this.refresh.bind(this), false)

    // window.addEventListener('popstate', e => {
    //   const path = e.state && e.state.path
    //   this.routes[path] && this.routes[path]()
    // })
  }

  // 添加路由
  route (path, cb) {
    this.routes[path] = cb || function () {}
  }

  refresh () {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl] && this.routes[this.currentUrl]()
  }
}

function changeBgColor (color) {
  document.body.style.backgroundColor = color || 'red'
  return color
}

const router = new hashRouter()
router.init()

router.route('/', () => {
  changeBgColor('red')
})

router.route('/blue', () => {
  changeBgColor('blue')
})

router.route('/green', () => {
  changeBgColor('green')
})