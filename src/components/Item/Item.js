import React from 'react'
import classes from './Item.module.scss'

const Item = props => {
    return (
        <div className={classes.Item} id={props.id}>
            <h3>{props.title}</h3>
            <div>
                <div>Score {props.score}</div>
                <div>
                    <div>
                        Autor {props.by}
                    </div>
                    <div>
                    {new Date(props.time * 1000).toUTCString()}
                      
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Item