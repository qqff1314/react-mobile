import React, { Component } from 'react';
import Header from '../../component/Header';
import http from '../../server';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css';
export default class Index extends Component {
    componentDidMount() {
        if(this.props.scrollTop!==0){
            let top=this.props.scrollTop;
            setTimeout(()=>{this.refs.list.scrollTop=top},0)
        }
        if(!this.props.pageStatus.List.length){
            this.getData()
        }
    }
    componentWillUnmount(){
        let scrollTop=this.refs.list.scrollTop
        this.props.setScrollTop(scrollTop);
    }
    Article=() =>{
        return (
            <div className="list" ref="list">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>this.getData()}
                    hasMore={this.props.pageStatus.HasMore}
                    loader={<div className="loader" key={0}></div>}
                    useWindow={false}
                    initialLoad	={false}>
                    <ul >
                        {
                            this.props.pageStatus.List.map((item,index)=>
                                index % 2 === 0 ?
                                <li className="list__item" key={index} onClick={()=>this.props.history.push({pathname: `/detail/${item.Id}`})}>
                                    <div className="list__img" style={{backgroundImage:"url("+item.Img+")"}}></div>
                                    <div className="list__info">
                                        <h2>{item.Title}</h2>
                                        <time dateTime={item.Time}>{item.Time.split(' ')[0]} 「{item.ClassName}」</time>
                                    </div>
                                </li>:
                                <li className="list__item" key={index} onClick={()=>this.props.history.push({pathname: `/detail/${item.Id}`})}>
                                    <div className="list__info">
                                        <h2>{item.Title}</h2>
                                        <time dateTime={item.Time}>{item.Time.split(' ')[0]} 「{item.ClassName}」</time>
                                    </div>
                                    <div className="list__img" style={{backgroundImage:"url("+item.Img+")"}}></div>
                                </li>
                            )
                        }
                    </ul>
                </InfiniteScroll>
            </div>
        );
    }
    getData(){
        let param=this.props.pageStatus;
        http.get('article/listSearch',{
            params: {
                Page:param.Page,
                Limit: param.Limit,
                KeyWord: param.KeyWord,
                ClassId:param.ClassId
            },
        }).then( (res)=> {
            let data=res.data;
            let obj=JSON.parse(JSON.stringify((param)));
            if(data.Total/param.Limit<=param.Page){
                obj.HasMore=false;
            }
            obj.Page=param.Page+1;
            obj.Total=data.Total;
            obj.List=param.List.concat(data.list);
            this.props.changePageStatus(obj);
        })
    }
    render() {
        return (
            <div className="main">
                <Header getData={()=>{this.getData()}}></Header>
                {this.Article()}
            </div>
            
        );
    }
}
