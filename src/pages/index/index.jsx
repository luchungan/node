import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtList, AtListItem, AtButton  } from "taro-ui"
import{ observer,inject} from '@tarojs/mobx'
import './index.scss'


@inject('todoStore')
@observer
export default class Index extends Component {
  constructor(props){
    super(props)
    this.state={
      todos:['吃饭','睡觉','唱歌'],
      val:''
    }

  }

  componentWillMount () { 
    // console.log('componentWillMount',this.props)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: 'todolist'
  }
  handleInput=(e)=>{
    console.log(e.target.value)
    this.setState({
      val:e.target.value
    })
  }
  handleClick=()=>{
    this.props.todoStore.addTodo(this.state.val)
    this.setState({
      val:''
    })
  }
  handleSwitchChange(i){
    this.props.todoStore.removeTodo(i)
  }
  render () {
    // console.log(this.props)
    const {todoStore} = this.props
    return (
      <View className='index'>
        <Text>todolist</Text>
        <Text>{todoStore.todos}</Text>
        <Input value={this.state.val} onChange={this.handleInput} placeholder='请输入你喜欢做的事'></Input>
        <AtButton type='primary' onClick={this.handleClick}>确认</AtButton>
        <AtList>
          {todoStore.todos.map((v,i)=>{
          return  <AtListItem key='index' isSwitch onSwitchChange={()=>{this.handleSwitchChange(i)}}  title={`${i+1}:${v}`}></AtListItem>
        })}
        </AtList>
        
      </View>
    )
  }
}
