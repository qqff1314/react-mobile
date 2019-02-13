import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeMenuStatus, changePageStatus, setClassList} from '../../store/actions.js'   
import http from '../../server';
import './index.css';
class Header extends Component {
    componentDidMount() {
        if(!this.props.comStatus.classList.length){
            this.getClass()
        }
    }
    getClass(){
        http.get('classify/list',{
        }).then( (res)=> {
            let data=res.data
            this.props.setClassList(data.list)
        })
    }
    menuClick(){
        let boolean=this.props.comStatus.menuStatus;
        this.props.changeMenuStatus(!boolean);
    }
    async clickClass(id){
        let param={
            List:[],
            Page:1,
            Limit: 10,
            KeyWord:'',
            ClassId:id,
            Total:0,
            HasMore:true
        }
        this.props.changeMenuStatus(false);
        await this.props.changePageStatus(param);
        // 为什么提交是异步的  为什么props不更新 为什么！！！
        this.props.getData()
    }
    render() {
        return (
            <div className={`header__box ${this.props.comStatus.menuStatus?"cur":""}`}>
                <header className="header">
                    <h1><a href="" className="logo">YUN HAN</a></h1>
                    <span className="menu" onClick={(e) => this.menuClick(e)}></span>
                </header>
                <div className="menu__box">
                    <p className="menu__title">分类</p>
                    <ul className="menu__list">
                        <li className={`menu__item ${this.props.comStatus.pageStatus.ClassId===''?'cur':''}`} onClick={()=>this.clickClass('')}>全部</li>
                    {
                        this.props.comStatus.classList.map((item,index)=>
                            <li className={`menu__item ${this.props.comStatus.pageStatus.ClassId===item.Id?'cur':''}`} key={index} onClick={()=>this.clickClass(item.Id)}>{item.ClassName}</li>
                        )
                    }
                    </ul>
                </div>
            </div>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        comStatus: state.comStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setClassList: (data) => dispatch(setClassList(data)),
        changeMenuStatus: (data) => dispatch(changeMenuStatus(data)),
        changePageStatus: (data) => dispatch(changePageStatus(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)