import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import { AtCard, AtBadge, AtIcon, AtButton } from 'taro-ui'


@inject('cartStore')
@observer
export default class Cart extends Component{
    config={
        navigationBarTitleText:'购物车'
    }
    constructor(props){
        super(props)

    }

    componentWillMount(){
        console.log(this.props)
    }
    cartSub=(i)=>{
        
        this.props.cartStore.cartSub(i)
    }
    cartAdd=(i)=>{
        this.props.cartStore.cartAdd(i)
    }
    render(){
        const {cartStore} = this.props
        return <View>
            {cartStore.carts.map((g,index)=>{
                    
                return <AtCard
                        key={g.id}
                        title={g.name}
                       extra={`￥${g.price}`}
                        
                >
                        <View className='at-row'>
                            <View className='at-col at-col-4'>
                                <Image className="card-img" mode='aspectFit' src={`${global.url}images/${g.img}`}></Image>
                            </View>
                            <View className='at-col at-col-8' >
                                <AtIcon onClick={()=>{this.cartSub(index)}} value="subtract" size='20'  color="red"></AtIcon> 
                                <Text>{g.count}</Text>
                                <AtIcon onClick={()=>{this.cartAdd(index)}} value="add" size='20'  color="red"></AtIcon> 
                            </View>
                        </View>
                </AtCard>  
            })}
            {cartStore.totalPrice>0?<AtButton type="primary">￥{cartStore.totalPrice}下单</AtButton>:null}
            
        </View> 
    }
}