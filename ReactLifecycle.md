# React组件的生命周期管理
自2013年6月发布以来，[React](https://github.com/facebook/react) 以星火燎原之势风靡前端朋友圈。
组件化的思想，组合式的开发，干净统一可复用的UI，高性能 [virtual  dom](http://www.infoq.com/cn/articles/react-dom-diff?utm_campaign=rightbar_v2&utm_source=infoq&utm_medium=articles_link&utm_content=link_text)，以及牛逼闪闪的 [react hot loader](https://github.com/gaearon/react-hot-loader)，无一不是为人称道的亮点之处。

React最重要的概念就是[组件化思想](https://facebook.github.io/react/docs/component-specs.html)，今天我们一起来探讨一下React组件以及组合组件的生命周期管理。

其实React的一个组件就相当于一个状态机，对于特定地输入，它总返回一致的输出。在组件的整个生命周期中，随着该组件的props或者state发生改变，其DOM表现也会有相应的变化。

一个React组件的生命周期分为三个部分：**实例化(Mounting)**、**存在期(Updating)**和**销毁时(Unmounting)**。

{注：以下讨论的均是客户端渲染，服务端渲染请参考：http://www.alloyteam.com/2015/10/8783/}


## 实例化(Mounting)
当组件在客户端被实例化，第一次被创建时，以下方法依次被调用：

(ES5)
```
- getDefaultProps
- getInitialState
- componentWillMount
- render
- [Childrens’ getDefaultProps & getInitialState]
- [Childrens’ componentWillMount & render]
- [Childrens’ componentDidMount]
- componentDidMount
```
(ES6)
```
- construtor( including defaultProps )
- componentWillMount
- render
- [Childrens' constructor]
- [Childrens’ componentWillMount & render]
- [Childrens’ componentDidMount]
- componentDidMount
```
### getDefaultProps(ES5)
对于每个组件类来讲，这个方法只会调用一次，该组件类的所有后续应用，getDefaultPops 将不会再被调用，其返回的对象可以用于设置默认的 props(properties的缩写) 值。
```javascript
var Hello = React.creatClass({
    getDefaultProps: function(){
        return {
            name: 'frank'
        }
    },
    render: function(){
        return (
            <div>Hello,{this.props.name}</div>
        )
    }
});

ReactDOM.render(<Hello />, document.body);
```
也可以在挂载组件的时候设置 props：
```javascript
var data = {name: 'A'};
<Hello data={data} />
```
别直接修改 this.props，任何引用类型的值(如数组，对象),都会在所有实例中共享，而不是每个组件实例拥有单独的副本，所以不要在组件实例中去修改 props，把它当成只读的数据最好(此处有demo)。

React通过 propTypes 提供了一种验证props 的方式，propTypes 是一个配置对象，用于定义属性类型：
```javascript
var Hello = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string,
        score: React.PropTypes.array
    },
    //...
});
```
组件初始化时，如果传递的属性和 propTypes 不匹配，则会打印一个 console.warn 日志。如果是可选配置，可以去掉.isRequired。常用的 PropTypes 如下：
![](http://7xqsa4.com1.z0.glb.clouddn.com/blogpropTypes.png)

### getInitialState(ES5)
对于组件的每个实例来说，这个方法的调用有且只有一次，用来初始化每个实例的 state，在这个方法里，可以访问组件的 props。每一个React组件都有自己的 state，其与 props 的区别在于 state只存在组件的内部，props 在所有实例中共享。

getInitialState 和 getDefaultPops 的调用是有区别的，getDefaultPops 是对于组件类来说只调用一次，后续该类的应用都不会被调用，而 getInitialState 是对于每个组件实例来讲都会调用，并且只调一次。
```javascript
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```
每次修改 state，都会重新渲染组件，实例化后通过 state 更新组件，会依次调用下列方法：
```
- shouldComponentUpdate
- conponentWillUpdate
- render
- conponentDidUpdate
```
但是不要直接修改 this.state，要通过 this.setState方法来修改。关于setState: http://segmentfault.com/a/1190000003969996

{ES6实现}：
```javascript
import React, {PropTypes, Component} from 'react';

class Hello extends Component{
    static defaultProps = {
        name: 'A'
    };
    static propTypes = {
        name: PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            happy: true
        };
    }
    //...
}
```
### componentWillMount
该方法在首次渲染之前调用，也是 render 方法调用之前修改 state 的最后一次机会。

### render
该方法会创建一个虚拟DOM，用来表示组件的输出。对于一个组件来讲，render方法是唯一一个必需的方法。render方法需要满足下面几点：

- 只能通过 this.props 和 this.state 访问数据（不能修改）
- 可以返回 null,false, '' 或者任何React组件
- 只能出现一个顶级组件，不能返回一组元素
- 不能修改DOM的输出

render方法返回的结果并不是真正的DOM元素，而是一个虚拟的类似于一个DOM tree结构的对象。这也是react效率高的原因。

### componentDidMount
该方法不会在服务端被渲染的过程中调用。
由于组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。
该方法被调用时，就已经渲染出真实的 DOM了。

从组件获取真实 DOM 的节点，可以用到 ref 属性：
```javascript
class Area extends Component{
    render(){
        let canvas = this.refs.mainCanvas; //render调用时，组件未挂载，这里将报错

        return <canvas ref='mainCanvas'>
    }

    componentDidMount(){
        let canvas = this.refs.mainCanvas;
        //这是有效的，可以访问到 Canvas 节点
    }
}
```
需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。

## 存在期(Updating)
此时组件已经渲染好并且用户可以与它进行交互，比如鼠标点击，手指点按，或者其它的一些事件，导致应用状态的改变，你将会看到下面的方法依次被调用
```
- componentWillReceiveProps (only called if parent updated)
- shouldComponentUpdate
- componentWillUpdate
- render
- [children's constructors or receive props phases]
- componentDidUpdate
```
### componentWillReceiveProps
组件的 props 属性可以通过父组件来更改，这时，componentWillReceiveProps 将来被调用。可以在这个方法里更新 state,以触发 render 方法重新渲染组件。
```javascript
componentWillReceiveProps(nextProps){
    if(nextProps.checked !== undefined){
        this.setState({
            checked: nextProps.checked
        })
    }
}
```
### shouldComponentUpdate
如果你确定组件的 props 或者 state 的改变不需要重新渲染，可以通过在这个方法里通过返回 false 来阻止组件的重新渲染，返回 `false 则不会执行 render 以及后面的 componentWillUpdate，componentDidUpdate 方法。
该方法是非必须的，并且大多数情况下没有在开发中使用。
```javascript
shouldComponentUpdate(nextProps, nextState){
    return this.state.checked === nextState.checked;
    //return false 则不更新组件
}
```
### componentWillUpdate
这个方法和 componentWillMount 类似，在组件接收到了新的 props 或者 state 即将进行重新渲染前，componentWillUpdate(object nextProps, object nextState) 会被调用，注意不要在此方面里再去更新 props 或者 state。

### componentDidUpdate
这个方法和 componentDidMount 类似，在组件重新被渲染之后，componentDidUpdate(object prevProps, object prevState) 会被调用。可以在这里访问并修改 DOM。

## 销毁时(Unmounting)
### componentWillUnmount

每当React使用完一个组件，这个组件必须从 DOM 中卸载后被销毁，此时 componentWillUnmout 会被执行，完成所有的清理和销毁工作，在 conponentDidMount 中添加的任务都需要再该方法中撤销，如创建的定时器或事件监听器。你将会看到下面的方法依次被调用
```
- componentWillUnmount
- [childrens’ componentWillUnmount]
- [childrens destroy]
- (destroy): The instance is now blank, released by React and ready for GC
```
当再次装载组件时，以下方法会被依次调用：
```
- getInitialState
- componentWillMount
- render
- componentDidMount
```

## 反模式

1. 在 getDefaultProps、getInitialState、shouldComponentUpdate、componentWillUpdate、render 和 componentWillUnmount 中调用 setState，
特别注意：不能在 shouldComponentUpdate 和 componentWillUpdate中调用 setState，会导致循环调用

2. 组件封装粒度太小，


## 总结
- React 通过三种状态：**实例化(Mouting)、存在期(Updating)、销毁时(Unmounting)**，管理整个生命周期的执行顺序；
- 不建议在 getDefaultProps、getInitialState、shouldComponentUpdate、componentWillUpdate、render 和 componentWillUnmount 中调用 setState，特别注意：不能在 shouldComponentUpdate 和 componentWillUpdate中调用 setState，会导致循环调用。

以下面的一张图总结组件的生命周期：
![](http://7xqsa4.com1.z0.glb.clouddn.com/bloglifecycle.jpg)

{ 注: 关于[ES6](http://es6.ruanyifeng.com/) }
{ 注: 关于[react-router](https://github.com/rackt/react-router), [2.0版本](https://github.com/rackt/react-router/blob/master/upgrade-guides/v2.0.0.md) }

