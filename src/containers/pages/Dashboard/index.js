import React, {useState, useEffect, Fragment} from 'react';
import { database } from '../../../config/firebase';
import './Dashboard.scss';

const Dashboard = () => {
    const [state, setState] = useState({
        title: '',
        content: '',
        uid: '',
        notes: [],
        textButton: 'Simpan',
        noteId: ''
    })

    useEffect(() => {
        getAllNotes();
    }, [])

    const onInputChange = (e, type) => {
        setState({
            ...state,
            [type]: e.target.value
        })
    }

    const handleSaveNote = () => {
        const newNote = {
            title: state.title,
            content: state.content,
            date: new Date().getTime(),
        }
        if (state.textButton === 'Simpan') {
            database.ref('notes/' + state.uid).push(newNote)
            .catch(err => err)
        } else {
            newNote.noteId = state.noteId
            database.ref(`notes/${state.uid}/${state.noteId}`).set(newNote)
        }
    }
    
    const getAllNotes = () => {
        const userData = localStorage.getItem('user');
        const user = JSON.parse(userData)
        database.ref('notes/' + user.uid).on('value', (snapshot) => {
            const data = [];
            // Object.keys make object to array
            Object.keys(snapshot.val()).map(key => {
                return data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            setState({...state, uid: user.uid, notes: data})
        });
    }

    const updateNote = (note) => {
        setState({
            ...state,
            title: note.data.title,
            content: note.data.content,
            textButton: 'Update',
            noteId: note.id
        })
    }

    const cancelUpdate = () => {
        setState({...state, textButton: 'Simpan', title: '', content: ''})
    }

    const deleteNote = (e, note) => {
        e.stopPropagation()
        console.log(note)
        database.ref(`notes/${state.uid}/${note.id}`).remove()
    }
    return (
        <div className="container">
            <div className="input-form">
                <input placeholder='title'className="input-title" value={state.title} onChange={(e) => onInputChange(e, 'title')}/>
                <textarea placeholder='content' className="input-content" value={state.content} onChange={(e) => onInputChange(e, 'content')}>

                </textarea>
                <div className="action-wrapper">
                    {state.textButton === "Update" ? (
                        <button className="save-btn cancel" onClick={cancelUpdate}>cancel</button>
                    ) : <div />}
                    <button className="save-btn" onClick={handleSaveNote}>{state.textButton}</button>
                </div>
            </div>
            <hr />
            {state.notes !== 0 && (
                <Fragment>
                    {state.notes.map(note => {
                        return (
                            <div className="card-content" key={note.id} onClick={() => updateNote(note)}>
                                <p className="title">{note.data.title}</p>
                                <p className="date">{note.data.date}</p>
                                <p className="content">{note.data.content}</p>
                                <div className="delete-btn" onClick={(e) => deleteNote(e, note)}>x</div>
                            </div>
                        )
                    })}
                </Fragment>
            )}
        </div>
    )
}

export default Dashboard;
