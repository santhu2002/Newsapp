import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, description, imgurl, newsurl,author,date,source} = this.props
        return (
            <div>
                <div className="card my-3" style={{
                    color:this.props.mode==="light"?"black":"white",
                    backgroundColor:this.props.mode==="light"?"white":"black",
                    border:this.props.mode==="dark"?"1px solid white":" 1px solid rgba(0,0,0,.125)"
                }} >
                    <img src={imgurl ? imgurl : "https://english.sakshi.com/sites/default/files/styles/hindi_400x300/public/article_images/2021/11/14/2527C504-0EEF-45EC-A3AB-04B32563B51E-1636898110.jpeg?itok=_3cRqkHr"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5><span className="badge bg-secondary">{source}</span>
                        <p className="card-text my-2">{!description? "NO DESCRIPTION ":description}.....</p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                    <div className="card-footer text-muted" >
                        By {author?author:"Unknown"} on {new Date(date).toGMTString()}
                    </div>
                </div>

            </div>
        )
    }
}

export default Newsitem
