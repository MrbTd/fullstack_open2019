import React from 'react'
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAndNotify = (event) => {
        event.preventDefault()
        props.setMessage(`you created ${event.target.newData.value}`)
        props.addNew(event.target.newData.value)
        setTimeout(() => {
            props.setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(event) => { addAndNotify(event) }}>
                <input name='newData'></input>
                <button>create</button>
            </form>

        </div>
    )
}

const mapDispatchToProps = {
  addNew,
  setMessage
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)