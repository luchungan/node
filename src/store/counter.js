import { observable } from 'mobx'
import Taro, { Component } from '@tarojs/taro'
const todoStore = observable({
    todos:['吃饭','睡觉','唱歌'],
    addTodo(item){
        this.todos.push(item)
    },
    removeTodo(i){
        Taro.showLoading({
            title:'删除中'
          })
          setTimeout(()=>{
            this.todos.splice(i,1)
            Taro.hideLoading()
          },2000)
       
    }
})

export default todoStore