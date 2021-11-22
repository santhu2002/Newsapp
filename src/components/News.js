import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


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
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: []
        }
    }
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
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NEWS 360`
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5aca45f99aac417aa874b19eceb0c8be&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false
        });

    };


    render() {
        return (
            <>

                <h1 className="text-center my-3" style={{ color: this.props.mode === "light" ? "black" : "white" }}>News 360 - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.totalResults !== this.state.articles.length}
                    loader={<Spinner />}
                >
                    <div className="container my-3">
                        <div className="row my-3">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} mode={this.props.mode} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>



        )
    }
}

export default News
