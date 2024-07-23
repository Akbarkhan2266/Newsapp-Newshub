import React, { Component } from 'react'

export default class Newsitem extends Component {

  render() {
    let { title, description, imageUrl, url, author, date ,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'86%',zIndex:'1'}}>{source} </span>
          <img src={!imageUrl ? "https://images.livemint.com/img/2024/07/19/1600x900/gbb30d8d079e6dd48e5aabbc93f7bc7fef48523c15130db8bc_1720597505809_1721364016349.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-muted'>By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}


