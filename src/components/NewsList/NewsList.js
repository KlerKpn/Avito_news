import React from 'react'
import { connect } from 'react-redux'
import Item from '../Item/Item'
import { getItems } from './../../store/actions/items';
import Loader from './../Loader/Loader';


class NewsList extends React.Component {

    componentDidMount() {
        this.props.load()
    }

    render() {
        return (
            <div >
                {
                    this.props.loading
                        ? <Loader />
                        : this.props.items.map(el => {
                            return (
                                <Item key={el.id}
                                    by={el.by}
                                    id={el.id}
                                    time={el.time}
                                    score={el.score}
                                    title={el.title}
                                />
                            )
                        })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.itemsReducer.items,
        loading: state.itemsReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        load: () => dispatch(getItems())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsList)