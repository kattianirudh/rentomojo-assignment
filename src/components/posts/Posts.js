import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import './posts.css';

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            posts: [],
            page: 1
        }
    }
    componentDidMount() {
        // this.props.fetchPosts(1).then((val) => console.log(this.props));
        this.fetchPosts(this.state.page);
    }

    fetchPosts(page) {
        this.props.fetchPosts(page).then();
    }

    search(val) {
        this.setState({searchQuery: val})
    }

    setPageNumber(pageNumber) {
        this.setState({page: pageNumber}, () => {
            this.fetchPosts(this.state.page);
        })
    }
    previousPage() {
        if(this.state.page>1)
           this.setPageNumber(this.state.page-1)
    }

    nextPage() {
        if(this.state.page<10)
            this.setPageNumber(this.state.page+1)
    }

    renderPosts() {
        let finalValues = [];
        this.props.posts.map((post) => {
            let temp;
            if(this.state.searchQuery !== '') {
                if(post.title.includes(this.state.searchQuery)){
                    temp = (<Link to={'/post/'+post.id}><h4 key={post.id}>{post.title}</h4></Link>)
                }
            } else {
                temp = (<Link to={'/post/'+post.id}><h4 key={post.id}>{post.title}</h4></Link>)
            }
            finalValues.push(temp);
            return true;
        })
        return finalValues;
    }

    render() {
        return (
            <div className="post-component">
                <div className="back-button">
                    <Link to='/'><Button variant="info">Back</Button>{''}</Link>
                </div>
                <div className="posts-content">
                    <div className="posts-search mt-2">
                        <input type="text" onChange={(e) => this.search(e.target.value)} />
                    </div>
                    <div className="posts">
                        <div className="posts-title"><h2>Posts</h2></div>
                        <div className="posts-content mt-2">
                            {this.renderPosts()}
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example" className="center-pagination">
                    <ul className="pagination">
                        {Array.apply(0, Array(10)).map((x, i) => {
                            return  <li className="page-item" onClick={() => this.setPageNumber(i+1)}><a className="page-link">{i+1}</a></li>
                        })}
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (id) => actions.fetchPosts(id)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
