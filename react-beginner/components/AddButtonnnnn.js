import { useState } from "react"

export default function AddBtn() {

    const [desc, setDesc] = useState('') // state type string
    const [notes, setNotes] = useState([]) 

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

    return (
        <button class="btn btn-outline btn-accent" onClick={handleAdd}>Add Note</button> 
    )
}

/* <button class="btn btn-outline">Default</button>
<button class="btn btn-outline btn-primary">Primary</button>
<button class="btn btn-outline btn-secondary">Secondary</button>
<button class="btn btn-outline btn-accent">Accent</button> */