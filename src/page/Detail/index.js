import React, { Component } from 'react';
import http from '../../server';
import './index.css';

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state={
           data:{}
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData(){
        http.get('article/detail?Id='+this.props.match.params.id,{})
        .then((res)=> {
            this.setState({data:res.data})
        })
    }
    render() {
        const data=this.state.data
        return (
            <div className="detail">
                <div className="detail__head">
                    <h2>{data.Title}</h2>
                    <time dateTime={data.Time} className="detail__time">{data.Time?data.Time.split(' ')[0]:''}</time>
                    <span className="detail__class">{data.ClassName}</span>
                    {
                        data.Img&&<div className="detail__img" style={{backgroundImage:"url("+data.Img+")"}}></div>
                    }
                </div>
                <div className="detail__content markdown-body" dangerouslySetInnerHTML={{__html: data.Detail}}></div>
                <div className="detail__back" onClick={()=>{this.props.history.goBack()}}></div>
            </div>
        );
    }
}
