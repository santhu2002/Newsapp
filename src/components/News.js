import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    const [loading, setloading] = useState(true)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    const updatenews = async () => {
        props.setprogress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
        props.setprogress(40);
        let data = await fetch(url);
        props.setprogress(60);
        let parseData = await data.json();
        props.setprogress(70);
        setarticles(parseData.articles);
        settotalResults(parseData.totalResults);
        // console.log(parseData)
        props.setprogress(100);
        setloading(false)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NEWS 360`
        updatenews();
        // below comment is used to clear warnings in console due to useeffect
        //  eslint-disable-next-line     
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;
        setpage(page + 1);
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData)
        setarticles(articles.concat(parseData.articles));
        settotalResults(parseData.totalResults);

    };

    return (
        <>

            <h1 className="text-center" style={{ color: props.mode === "light" ? "black" : "white",marginTop:"70px" }}>News 360 - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={totalResults !== articles.length}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    <div className="row my-3">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} mode={props.mode} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>



    )
}


News.defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
}

export default News
