import { observable, computed, autorun } from 'mobx'
import Taro, { Component } from '@tarojs/taro'


const cartStore = observable({
    carts:Taro.getStorageSync('cartData')||[],
    totalPrice:0,
    cartSub(i){
        const newCount = this.carts[i].count - 1
        if(newCount<1){
            this.carts.splice(i,1)
        }else{
            this.carts[i]={...this.carts[i],count:newCount}
        }
        
    },
    cartAdd(i){
        const newCount = this.carts[i].count + 1
        this.carts[i]={...this.carts[i],count:newCount}
    },
    addCart(item){
        const findIndex = this.carts.findIndex(v=> v.id== item.id)
        if(findIndex>-1){
            this.carts[findIndex].count +=1
        }else{
            item.count = 1
            this.carts.push(item)
        }
        Taro.showToast({
            title:'添加成功',
            duration:2000
        })
    }
})
const totalCount =computed(()=>cartStore.carts.reduce((sum,a)=>sum+a.count,0))
const totalPrice =computed(()=>cartStore.carts.reduce((sum,a)=>sum+a.count*a.price,0))
autorun(()=>{
    if(totalCount>0){
        Taro.setTabBarBadge({
        index:1,
        text:totalCount.get() + ''
    })
    }else{
        Taro.removeTabBarBadge({
            index:1
           
        }) 
    }
    cartStore.totalPrice = totalPrice.get()
    Taro.setStorageSync('cartData',cartStore.carts.toJS())
})
export default cartStore