import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image,Swiper, SwiperItem } from '@tarojs/components'
import{ observer,inject} from '@tarojs/mobx'
// import {} from '@tarojs/components'
import './home.scss'
import { AtCard, AtBadge, AtIcon, AtLoadMore,AtDivider } from 'taro-ui'

@inject('cartStore')
@observer
export default class Home extends Component{
    config = {
        enablePullDownRefresh:true
    }
constructor(props){
    super(props)
    this.page = 1
    this.state={
        hasMore:false,
        top:[],
        goods:[]
    }
}
onPullDownRefresh(){
    this.getGoods()
}
onReachBottom(){
    if(!this.state.hasMore){
        return 
    }
    this.loadMore()
}
    loadMore = ()=>{
        this.page +=1
        this.getGoods(true)
    }
    componentDidMount(){
        this.getGoods()
        global.getData('api/top').then(top=>{
            console.log(top)
            this.setState({top})
        })
    }
    getGoods(append){
        global.getData('api/goods?page='+this.page).then(goods=>{
            if(append){
                this.setState({
                    goods:[...this.state.goods,...goods]
                })
            }else{
                this.page = 1
                this.setState({goods})
            }
            this.setState({
                hasMore:goods.length===10
            })
        })
    }
    addCart(item){
        this.props.cartStore.addCart(item)
    }

    render(){
        return <View>
            <Swiper
                className='swiper-container'
                indicatorDots
                indicatorColor='#999'
                indicatorActiveColor={global.primaryColor}
                interval={2000}
                circular
                autoplay
            >
                {this.state.top.map(t=>{
                    return <SwiperItem key='index'>
                            <div class='swiper-img'>
                                <Image mode='aspectFit' src={`${global.url}images/${t.img}`}></Image>
                            </div>
                            
                        </SwiperItem>
                })}
                
               
            </Swiper>
            <View type="margin-top:15px">
                {this.state.goods.map(g=>{
                    const thumb = g.solded>200?global.url + 'fire.png' : ''
                return <AtCard
                        key={g.id}
                        title={g.name}
                        note="课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介"
                        extra={`￥${g.price}`}
                        thumb={thumb}
                >
                        <View className='at-row'>
                            <View className='at-col at-col-4'>
                                <Image className="card-img" mode='aspectFit' src={`${global.url}images/${g.img}`}></Image>
                            </View>
                            <View className='at-col at-col-7'>
                            <View>已有{g.solded}人购买</View>
                            <AtBadge value={g.name}></AtBadge>
                            </View>
                            <View className='at-col at-col-1'>
                            <AtIcon onClick={()=>{this.addCart(g)}} value="add" size='20'  color="red"></AtIcon> 
                            </View>
                        </View>
                </AtCard>  
            })}
             {this.state.hasMore? <View>加载更多</View>: <AtDivider content="我是有底线的"></AtDivider>}
            </View> 
            
        </View> 
    }
}