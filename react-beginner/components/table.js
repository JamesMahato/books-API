import axios from "axios"
import { useEffect, useState } from "react"

const baseURL = 'http://localhost:4000/notes'


export default function TB(){

    const [notes, setNotes] = useState([]) 

    // axios changes
    useEffect(() => {
        axios.get(baseURL)
            .then(response => {
                console.log(response);
                setNotes(response.data)
            })
    }, [])

    
    // axios changes
    const deleteNote = (noteId) => {
        if(window.confirm(`Are you sure you want to delete ${noteId}`)){
            axios.delete(`${baseURL}/${noteId}`)
                .then(response => console.log(response))
                    setNotes(notes.filter((note) => note.id !== noteId))
        }
    }

    return(
        <div class="overflow-x-auto">
            <table class="table">
                {/* <!-- head --> */}
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    notes.map(note => 
                        <tr>

                            <td> {note.id} </td>
                            <td> {note.desc} </td>

                            <button onClick={() => deleteNote(note.id)}>Delete</button>

                        
                        </tr>)
                }
                  
               
              
                </tbody>
            </table>
        </div>
    )
}