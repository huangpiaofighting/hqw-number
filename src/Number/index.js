import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
// import { each } from 'lodash';
import styles from './index.less'

class NumberCanvas extends Component {
  static propTypes = {
    color: PropTypes.string,
    num: PropTypes.oneOfType([PropTypes.string , PropTypes.number]),
    fontSize: PropTypes.oneOfType([PropTypes.string , PropTypes.number]),
    opacity: PropTypes.number,
  };

  static defaultProps = {
    color: 'black',
    num: '9',
    fontSize: '14',
    opacity: 1,
  };

  constructor() {
    super();
    this.$canvas = createRef();
    this.$hideToolsDiv = createRef();

  }

  init(){
    this.qingxie = (5 * this.containerHeight) / 300;
    this.numWidth = (130 * this.containerHeight) / 300;// 300为高度的基数
    this.containerWidth = this.props.num.length * (this.numWidth + this.qingxie*10);
    this.numHight = (25 * this.containerHeight) / 300;
  }

  componentDidMount() {
    this.containerHeight = this.$hideToolsDiv.current.offsetHeight;
    this.init();
    this.stage = new Konva.Stage({
      container: this.$canvas.current, // 可以是个string 或者 是个el
      width: this.containerWidth,
      height: this.containerHeight,
    });
    this.layer = new Konva.Layer();
    this.layer.destroy();
    this.getNumbers();
    this.stage.add(this.layer);
  }

  getNumbers(){
    const {length} = this.props.num;
    const numberArr = []
    for (let i = 0;i < length;i++) {
      numberArr.push(this.props.num.charAt(i))
    }
    numberArr.forEach((item,i)=>{
      const group = this.createNum(item)
      group.move({
        x: (this.numWidth*i+this.qingxie*10*i),
        // x: 0,
        y: 0
      })
      this.layer.add(group)
    })
    // each(numberArr, (item,i)=>{
    //   const group = this.createNum(item)
    //   group.move({
    //     x: (this.numWidth*i+this.qingxie*10*i),
    //     // x: 0,
    //     y: 0
    //   })
    //   this.layer.add(group)
    // });
  }

  createNum(num){
    const group = new Konva.Group()
    this.createOrginHeng();
    this.createOrginShu();
    this.createShu();
    this.createHeng();
    switch (num) {
      case '0':
        group.add(this.shu1)
        group.add(this.shu2)
        group.add(this.shu3)
        group.add(this.shu4)
        group.add(this.heng1)
        group.add(this.heng3)
        break
      case '1':
        group.add(this.shu2)
        group.add(this.shu4)
        break
      case '2':
        group.add(this.shu2)
        group.add(this.shu3)
        group.add(this.heng1)
        group.add(this.heng2)
        group.add(this.heng3)
        break
      case '3':
        group.add(this.shu2)
        group.add(this.shu4)
        group.add(this.heng1)
        group.add(this.heng2)
        group.add(this.heng3)
        break
      case '4':
        group.add(this.shu1)
        group.add(this.shu2)
        group.add(this.shu4)
        group.add(this.heng2)
        break
      case '5':
        group.add(this.shu1)
        group.add(this.shu4)
        group.add(this.heng1)
        group.add(this.heng2)
        group.add(this.heng3)
        break
      case '6':
        group.add(this.shu1)
        group.add(this.shu3)
        group.add(this.shu4)
        group.add(this.heng1)
        group.add(this.heng2)
        group.add(this.heng3)
        break
      case '7':
        group.add(this.shu2)
        group.add(this.shu4)
        group.add(this.heng1)
        break
      case '8':
        group.add(this.shu1)
        group.add(this.shu2)
        group.add(this.shu3)
        group.add(this.shu4)
        group.add(this.heng1)
        group.add(this.heng2)
        group.add(this.heng3)
        break
      case '9':
        group.add(this.shu1)
        group.add(this.shu2)
        group.add(this.shu4)
        group.add(this.heng1)
        group.add(this.heng2)
        group.add(this.heng3)
        break
      case '-':
        group.add(this.heng2)
        break
      default:
        break
    }
    return group;
  }

  createShu(){
    this.shu1 = this.orginShu.clone({
      x: this.orginShu.x() + this.qingxie,
      y: this.orginShu.y()
    });
    this.shu2 = this.orginShu.clone({
      x: this.shu1.x() + this.numWidth - this.qingxie,
      y: this.orginShu.y()
    })
    this.shu3 = this.orginShu.clone({
      x: this.orginShu.x() - this.qingxie * 2,
      y: this.orginShu.y() + this.numWidth + this.qingxie
    })
    this.shu4 = this.orginShu.clone({
      x: this.shu3.x() + this.numWidth  - this.qingxie ,
      y: this.shu3.y()
    })
  }

  createHeng(){
    this.heng1 = this.orginHeng.clone({
      x: 0 + this.qingxie * 4,
      y: 0
    })
    this.heng2 = this.orginHeng.clone({
      x: 0 + this.qingxie ,
      y: this.numWidth + this.qingxie
    })
    this.heng3 = this.orginHeng.clone({
      x: -this.qingxie*2 ,
      y: this.numWidth*2 + this.qingxie
    })
  }

  createOrginHeng(orgPos = {}) {
    // heng的起始位置
    const orgX = orgPos.x || 0;
    const orgY = orgPos.y || 0;
    const org1 = {
      x: orgX,
      y: orgY + this.numHight / 2,
    };
    const org2 = {
      x: orgX + this.numWidth / 5 + this.qingxie,
      y: orgY,
    };
    const org3 = {
      x: orgX + this.numWidth * (4 / 5) + this.qingxie,
      y: orgY,
    };
    const org4 = {
      x: orgX + this.numWidth,
      y: orgY + this.numHight / 2,
    };
    const org5 = {
      x: orgX + this.numWidth * (4 / 5) - this.qingxie,
      y: orgY + this.numHight,
    };
    const org6 = {
      x: orgX + this.numWidth / 5 - this.qingxie,
      y: orgY + this.numHight,
    };
    this.orginHeng = new Konva.Shape({
      x: 0, // 开始的原点
      y: 0,
      sceneFunc(context) {
        context.beginPath();
        context.moveTo(org1.x, org1.y);
        context.lineTo(org2.x, org2.y);
        context.lineTo(org3.x, org3.y);
        context.lineTo(org4.x, org4.y);
        context.lineTo(org5.x, org5.y);
        context.lineTo(org6.x, org6.y);
        context.closePath();
        context.fillStrokeShape(this);
      },
      offset: {
        x: (-20 * this.containerHeight) / 300,
        y: 0,
      },
      opacity:this.props.opacity,
      fill: this.props.color,
    });
  }

  createOrginShu () {
    if(!this.orginHeng){
      this.createOrginHeng()
    }
    this.orginShu =this.orginHeng.clone()
    this.orginShu.offsetY(this.numHight)
    this.orginShu.move({
      x: 50*this.containerHeight/300,
      y: -4*this.containerHeight/300
    })
    this.orginShu.scaleY(-1)
    this.orginShu.rotation(95)
  }

  componentDidUpdate(){
    console.log("this.props.num",this.props.num)
    this.containerHeight = this.$hideToolsDiv.current.offsetHeight;
    this.init();
    this.stage.width(this.containerWidth);
    this.stage.height(this.containerHeight);
    this.layer.destroy();
    this.getNumbers();
    this.stage.add(this.layer);
  }

  render() {
    return (
      <div className={styles.numberContainer}>
        <div className={styles.canvasContainer} ref={this.$canvas} />
        <div className={styles.hideContainer} style={{fontSize:`${this.props.fontSize}px` ,color:'red'}} ref={this.$hideToolsDiv} >{this.props.num}</div>
      </div>
    );
  }
}

export default NumberCanvas;
