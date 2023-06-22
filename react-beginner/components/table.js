import axios from "axios";
import { useEffect, useState } from "react";
import AddBtn from "./addbutton";

const baseURL = 'http://localhost:4000/notes';

export default function TB() {
  const [notes, setNotes] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios.get(baseURL)
      .then(response => {
        console.log(response);
        setNotes(response.data);
      });
  };

  const deleteNote = (noteId) => {
    if (window.confirm(`Are you sure you want to delete ${noteId}`)) {
      axios.delete(`${baseURL}/${noteId}`)
        .then(response => {
          console.log(response);
          setNotes(notes.filter((note) => note.id !== noteId));
        });
    }
  };

  const handleChange = (noteId) => {
    setUpdateId(noteId);
    const note = notes.find(n => n.id === noteId);
    setDesc(note.desc);
  };

  const editNote = () => {
    const note = notes.find(n => n.id === updateId);

    axios.put(`${baseURL}/${note.id}`, { ...note, desc: desc })
      .then(response => {
        console.log(response);
        const updatedNote = notes.map(n => n.id === note.id ? { ...note, desc: desc } : n);
        setNotes(updatedNote);
      });

    setDesc('');
    setUpdateId(0);
  };

  const handleAddNote = (newNote) => {
    axios.post(baseURL, newNote)
      .then(response => {
        console.log(response);
        setNotes([...notes, response.data]);
      });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>
                {updateId === note.id ? (
                  <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                ) : (
                  note.desc
                )}
              </td>
              <td>
                {updateId === note.id ? (
                  <button onClick={editNote}>Save</button>
                ) : (
                  <>
                    <button onClick={() => deleteNote(note.id)}>Delete</button>
                    <br />
                    <button onClick={() => handleChange(note.id)}>Edit</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddBtn onAddNote={handleAddNote} />
    </div>
  );
}
