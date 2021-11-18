import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);}
      


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: []
        }
    }
    // updatenews=()=>{
// we can refactor the code by writing updatenews function
    // }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5aca45f99aac417aa874b19eceb0c8be&page=1&pagesize=${this.props.pagesize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        // console.log(parseData)
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - NEWS 360`
    }
    handlenext = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5aca45f99aac417aa874b19eceb0c8be&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState(
            {
                articles: parseData.articles,
                page: this.state.page + 1,
                loading: false
            }
        )


    }
    handleprev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5aca45f99aac417aa874b19eceb0c8be&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState(
            {
                articles: parseData.articles,
                page: this.state.page - 1,
                loading: false
            }
        )

    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{color:this.props.mode==="light"?"black":"white"}}>News 360 - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                {!this.state.loading && <div className="row my-3">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} mode={this.props.mode} />
                        </div>
                    })}
                </div>}
                {!this.state.loading && <div className="container my-5 d-flex justify-content-between ">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handleprev}>&#8592; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-success" onClick={this.handlenext}>Next &#8594;</button>
                </div>}

            </div>


        )
    }
}

export default News
