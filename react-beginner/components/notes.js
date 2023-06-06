import axios from "axios"
import { useEffect, useState } from "react"

const baseURL = 'http://localhost:4000/notes'

export default function Notes() {
    
    // Object destrucuture
    // const { notes } = props

    const [desc, setDesc] = useState('') // state type string
    const [notes, setNotes] = useState([]) 
    const [editNote, setEditNote] = useState(false) // state type bool
    const [targetNote, setTargetNote] = useState({}) // state type object
    const [showAll, setShowAll] = useState('')

    // axios changes
    useEffect(() => {
        axios.get(baseURL)
            .then(response => {
                console.log(response);
                setNotes(response.data)
            })
    }, [])

    const filterNotes = showAll 
        ? notes
        : notes.filter(n => n.important === true)

    const handleChange = (event) => {
        console.log(event.target.value)
        setDesc(event.target.value)
    }

    // axios changes
    const handleAdd = (event) => {
        event.preventDefault()
        const newNote = {
            desc: desc,
            important : Math.random() < 0.5
        }
        axios.post(baseURL, newNote)
        .then(response => {
            console.log(response.data);
            setNotes(notes.concat(response.data))
        })
        // console.log(newNote);
        setDesc("")
    }

    // axios changes
    const deleteNote = (noteId) => {
        if(window.confirm(`Are you sure you want to delete ${noteId}`)){
            axios.delete(`${baseURL}/${noteId}`)
                .then(response => console.log(response))
                    setNotes(notes.filter((note) => note.id !== noteId))
        }
        // const updatedNotes = notes.filter((note) => note.id !== noteId);
        // setNotes(updatedNotes);}
    }

    const handleEdit = (noteId) => {
        // alert(noteId)
        // console.log(notes.find(n => n.id === noteId));
        const targetNote = notes.find(n => n.id == noteId)
        setDesc(targetNote.desc)
        setEditNote(true)
        setTargetNote(targetNote)
    }

    // axios changes
    const handleUpdate = (event) => {
        event.preventDefault()
        axios.put(`${baseURL}/${targetNote.id}`,
            {...targetNote, desc, desc})
            .then(response => {
                console.log(response);
            })
        const updatedNote = notes.map(n => n.id === targetNote.id ? 
            {...targetNote, desc: desc}:
            n
        ) // object spread ...
        setNotes(updatedNote)
        setEditNote(false)
        setDesc('')
    }

    const handleImportant = () => {
        setShowAll(!showAll)
    }

    const h2style = {
        color: "red",
        fontStyle: "Italic",
        fontSize: 20, 
    }

    return (
        <>
            <h1>Notes App</h1>
            {/* <h2 style={{color:"cyan"}}>Hello World</h2> */}
            <h2 style={h2style}>Hello World</h2>
            <button onClick={handleImportant}>
                Show {showAll ? 'Important': 'All'}
            </button>
            {/* <ul>
                {
                    filterNotes.map(note => 
                        <li style={{paddingRight: 10}} key = {note.id}>
                            {note.desc}
                            <>                   </>
                            <button onClick={() => deleteNote(note.id)}>Delete</button>
                            <button type="button" onClick={() => handleEdit(note.id)}>Edit</button>

                        </li>)
                }
            </ul> */}
            <br/>
            <form>
                <input type="text" value={desc} onChange={handleChange}/> 
                {" "}
                {
                    editNote ?
                    <button type="button" onClick={handleUpdate}>Update</button>:
                    <button type="button" onClick={handleAdd}>Add</button>
                }
            </form>
        </>
    )
}