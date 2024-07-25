import React, { Component } from 'react'

export default class Newsitem extends Component {

  render() {
    let { title, description, imageUrl, url, author, date ,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'86%',zIndex:'1'}}>{source} </span>
          <img src={!imageUrl ? "https://mir-s3-cdn-cf.behance.net/projects/404/862852143512147.Y3JvcCwxNTg1LDEyNDAsMTg3Miw0ODI.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-danger'>By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}


