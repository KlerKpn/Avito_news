import React from 'react'
import axios from 'axios'
import Loader from './../Loader/Loader'
import { connect } from 'react-redux'
import { changeLoading } from './../../store/actions/items';
import Comment from '../Comment/Comment';


class Story extends React.Component {

    state = {
        data: {}
    }

    async componentDidMount() {
        this.props.loader(true)

        try {
            // const data = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${8863}.json?print=pretty`)   for exapmle
            const data = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.id}.json?print=pretty`)
            this.setState({ data: data.data })
        } catch (error) {
            console.log(error)
        }

        this.props.loader(false)
    }

    render() {
        return (
            <div>
                {
                    this.props.loading
                        ? <Loader />
                        : <div>
                            <h2>
                                {this.state.data.title}
                            </h2>
                            <div>
                                <span>Autor <strong>{this.state.data.by}</strong></span>
                            </div>
                            <div>
                                <a href={this.state.data.url}>View post</a>
                            </div>
                            <div>
                                <span>Comments <strong>{this.state.data.descendants}</strong></span>
                                {
                                    this.state.data.kids

                                        ? this.state.data.kids.map(el => {
                                            const id = Math.random()
                                            return (
                                                <Comment
                                                    key={id}
                                                    el={el}
                                                />
                                            )
                                        })

                                        : null
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.itemsReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loader: (type) => dispatch(changeLoading(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Story)