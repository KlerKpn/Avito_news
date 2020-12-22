import React from 'react'
import axios from "axios";
import Loader from '../Loader/Loader';
import classes from './Comment.module.scss'


class Comment extends React.Component {

    state = {
        data: null,
        show: false
    }

    async componentDidMount() {
        const items = []
        if (this.props.type === 'comment') {
            const result = this.props.el.map((el) => {
                return new Promise((resolve, reject) => {
                    resolve(axios.get(`https://hacker-news.firebaseio.com/v0/item/${el}.json?print=pretty`))
                })
            })

            await Promise.all(result)
                .then(id => {
                    id.forEach(element => {
                        if (element !== null) {
                            items.push(element.data)
                        }
                    })
                })

        } else {
            const data = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.el}.json?print=pretty`)
            items.push(data.data)

        }

        this.setState({
            data: items
        })
    }

    render() {
        let currentClass
        let line
        if (this.props.type === 'comment') {
            currentClass = classes.Comment_by
            line = classes.line
        } else {
            currentClass = classes.Comment
            line = ''
        }
        console.log(typeof this.state.data)
        return (
            <>

                {
                    !this.state.data
                        ? <Loader />
                        : this.state.data.map(el => {
                            const index = Math.random()
                            return (
                                <div className={currentClass} key={index}>
                                    <div className={line} />
                                    <div style={{ width: '100%' }}>
                                        <div className={classes.by}>
                                            <span>Comment by <strong>{el.by}</strong></span>
                                        </div>
                                        <div className={classes.text}>
                                            {el.text}
                                        </div>
                                        <div className={classes.date}>
                                            {new Date(el.time * 1000).toUTCString()}
                                        </div>
                                        {
                                            el.kids
                                                ? <>
                                                    <button
                                                        className='btn btn-dark'
                                                        onClick={() => this.setState({ show: true })}
                                                    >
                                                        <span>Ответы {el.kids.length}</span>
                                                    </button>
                                                    {
                                                        this.state.show
                                                            ? <Comment
                                                                el={el.kids}
                                                                type={'comment'}
                                                            />
                                                            : null
                                                    }
                                                </>
                                                : null
                                        }
                                    </div>
                                </div>
                            )
                        })
                }
            </>
        )
    }
}

export default Comment