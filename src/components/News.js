import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 40,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    console.log("hello i m constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsHub`;
  }

  async updateNews(pageNo){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=da968b458e2e40bca608e86b07f1a5a8&page=1&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=da968b458e2e40bca608e86b07f1a5a8&page=1&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

  }
  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da968b458e2e40bca608e86b07f1a5a8&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false

    })
    // this.setState({page: this.state.page - 1});
    // this.updateNews();
  }
  handleNextClick = async () => {

    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da968b458e2e40bca608e86b07f1a5a8&page=2&pagesize=${this.props.pagesize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json()
      // console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
    // this.setState({page: this.state.page + 1});
    // this.updateNews();
  }
//  fetchMoreData =async()=>{
//   this.setState({page:this.state.page +1})
//   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=da968b458e2e40bca608e86b07f1a5a8&page=1&pagesize=${this.props.pagesize}`;
//   this.setState({ loading: true });
//   let data = await fetch(url);
//   let parsedData = await data.json();
 
//   this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
// }

  render() {
    
    return (
      <><div className='container my-3'>
        <center><h1 color='blue' style={{margin:'35px 0px', marginTop:'90px'}}><u><b>NEWSHUB From {this.capitalizeFirstLetter(this.props.category)} Category</b></u></h1></center>
        {this.state.loading && <Spinner />}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length !== this.state.totalResults}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container"> */}
 {/* {this.state.articles.map((element) => { */}
        <div className="row" >
          {!this.state.loading && this.state.articles.map((element) => {
           
            return <><div className="col-md-4" key={element.url}>
              <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div></>
          })}

        </div>
        {/* </div> */}
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page >1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div></>
    )
  }
}


