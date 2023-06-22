import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:4000/notes";

export default function AddBtn() {
  const [desc, setDesc] = useState(''); // state type string
  const [notes, setNotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // state to control dialog visibility

  const handleAdd = async (event) => {
    event.preventDefault();
    const newNote = {
      desc: desc,
      important: Math.random() < 0.5,
    };
  
    try {
      const response = await axios.post(baseURL, newNote);
      console.log(response.data);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error(error);
    }

    // axios.post(baseURL, newNote)
    //   .then(response => {
    //     console.log(response.data);
    //     setNotes([...notes, response.data]);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    setDesc("");
    setIsDialogOpen(false); // Close the dialog after adding a note
  };

  const openDialog = () => {
    setIsDialogOpen(true); // Open the dialog
  };

  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div>
      <button className="btn btn-outline btn-accent" onClick={openDialog}>
        Add Note
      </button>
      <dialog id="mymodel" className="modal" open={isDialogOpen}>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter note description"
            required
          />
          <button type="submit">Add</button>
          <button type="button" onClick={closeDialog}>Cancel</button>
        </form>
      </dialog>
    </div>
  );
}

/* <button class="btn btn-outline">Default</button>
<button class="btn btn-outline btn-primary">Primary</button>
<button class="btn btn-outline btn-secondary">Secondary</button>
<button class="btn btn-outline btn-accent">Accent</button> */