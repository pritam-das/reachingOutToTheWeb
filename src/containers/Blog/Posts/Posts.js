import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link } from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: []

    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    componentDidMount () {
        axios.get('/posts')
          .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'PD'
                    }
                })
                this.setState({posts: updatedPosts})
          }).catch(error => console.log(error));
    }

    render () {

        let posts = this.state.posts.map(post => {
            return <Link to={'/' + post.id} key={post.id}>
                        <Post
                          key={post.id}
                          title={post.title}
                          author={post.author}
                          clicked={() => this.postSelectedHandler(post.id)}/>
                    </Link>
        });

        return (
          <section className="Posts">
              {posts}
          </section>
        )
    }
}

export default Posts;
