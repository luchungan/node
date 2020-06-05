import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import { Provider} from '@tarojs/mobx'
import todoStore from './store/counter'
import cartStore from './store/cart'


import './app.scss'

global.url = 'https://lucg.club/'
global.primaryColor = '#195caf'
global.getData = (url)=>{

  Taro.showLoading({
    title:'加载中'
  })
  return Taro.request({
    url: global.url+url,
  }).then(res=>{
    
    Taro.hideLoading()
    if(res.statusCode==200 && res.data.code==0){
        return res.data.data

    }else{
      Taro.showToast({
        title: '小老弟 出错了',
        duration: 2000
      })
    }

  })
}

const store = {
  todoStore,
  cartStore
}
class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      
      'pages/home/home',
      'pages/cart/cart',
      'pages/user/user',
    ],
    window: {
      navigationBarTitleText: '小商城',
    },
    tabBar: {
      selectedColor: "#b4282d",
      list: [{
        pagePath: "pages/home/home",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "首页"
      },
      {
        pagePath: "pages/cart/cart",
        iconPath: "./assets/tab-bar/cart.png",
        selectedIconPath: "./assets/tab-bar/cart-active.png",
        text: "购物车"
      }, 
      
      {
        pagePath: "pages/user/user",
        iconPath: "./assets/tab-bar/user.png",
        selectedIconPath: "./assets/tab-bar/user-active.png",
        text: "个人"
      }]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
      
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
