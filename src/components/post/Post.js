import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../actions';
import Spinner from 'react-bootstrap/Spinner'

import './post.scss';



export class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPostLoading: false,
            isCommentsLoading: false,
            postTitle: '',
            postBody: '',
            showComments: false,
            comments: []
        }
    }
    componentDidMount() {
        this.setState({isPostLoading: true});
        actions.fetchPost(this.props.match.params.id)().then((res) => {
            this.setState({
                postTitle: res.data.title,
                postBody: res.data.body,
                isPostLoading: false
            })
        })
    }
    renderPosts() {
        if(this.state.isPostLoading){
            return (
                <Spinner animation="border mt-5" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
        else {
            return (
                <div>
                    <h1>{this.state.postTitle}</h1>
                    <hr />
                    <p>
                        {this.state.postBody}
                    </p>
                </div>
            )
        }
    }
    getComments() {
        this.setState({
            isCommentsLoading: true,
            showComments: true
        }, () => {
            actions.fetchComments(this.props.match.params.id)().then((val) => {
                this.setState({
                    isCommentsLoading: false,
                    comments: val.data
                })

            }).catch((err) => console.error('Falied getting comments failed'))
        })
    }
    deletePost() {
        actions.deleteComments(this.props.match.params.id)().then((res) => {
            this.props.history.push('/');
        }).catch((err)=> {
            console.error('failed to delete');
        })
    }
    renderComments() {
        let finalValues = [];
        this.state.comments.map((comment) => {
            let temp = (
                <div className="comment mb-5">
                    <div className="comment-header">
                        <div className="comment-name"><b>{comment.name}</b></div>
                        <div className="comment-email">{comment.email}</div>
                    </div>
                    <div className="comment-body">
                        {comment.body}
                    </div>
                </div>
            )
            finalValues.push(temp);
        })
        return finalValues;
    }
    render() {
        return (
            <div className="post-component">
                <div className="post-back">
                    <Link to='/'><Button variant="info mr-2">Home</Button>{''}</Link>
                    <Button variant="info mr-2" onClick={() => this.props.history.goBack()}>Back</Button>{''}
                    <Button variant="danger" className="f-end" onClick={() => this.deletePost()}>Delete</Button>{''}
                </div>
                <div className="post-title">
                    {this.renderPosts()}
                </div>
                <hr />
                <div className="post-comments">
                    <h2>Comments</h2>
                    {
                        !this.state.showComments &&
                        <button className="btn btn-primary mt-2" onClick={() => this.getComments()}>Show comments</button>
                    }
                    {
                    this.renderComments()
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
