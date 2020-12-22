import { SET_ITEMS, CHANGE_LOADING } from './actionTypes'
import axios from 'axios'

export function getItems() {
    return async dispatch => {

        const data = await axios.get(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
        const stories = data.data.slice(0, 100)
        const items = []

        const result = stories.map((el) => {
            return new Promise((resolve, reject) => {
                resolve(axios.get(`https://hacker-news.firebaseio.com/v0/item/${el}.json?print=pretty`))
            })
        })

        await Promise.all(result)
            .then(id => {
                id.forEach(element => {
                    if(element !== null){
                        items.push(element.data)
                    }
                })
            })

        dispatch(setItems(items))
        dispatch(changeLoading(false))
    }
}

export function setItems(items) {
    return {
        type: SET_ITEMS,
        payload: items
    }
}

export function changeLoading(type) {
    return {
        type: CHANGE_LOADING,
        payload: type
    }
}

