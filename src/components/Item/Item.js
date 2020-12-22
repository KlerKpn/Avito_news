import React from 'react'
import classes from './Item.module.scss'
import { withRouter } from 'react-router-dom'

const Item = props => {
    return (
        <div className={classes.Item} id={props.id} onClick={() => props.history.push('/story/' + props.id)}>
            <h3>{props.title}</h3>
            <div>
                <div>Score {props.score}</div>
                <div>
                    <div>
                        <span>Autor {props.by}</span>
                    </div>
                    <div>
                        {new Date(props.time * 1000).toUTCString()}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default withRouter(Item)