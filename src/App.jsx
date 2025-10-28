import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Button from 'react-bootstrap/Button';

const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    noteService.getAll().then((notesFromBackend) => {
      setNotes(notesFromBackend)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      title: newNote.title,
      content: newNote.content,
      archived: false
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote({ title: '', content: '' });
    })
  }


   const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handlerArchive = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, archived: !note.archived }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
  }

  const deleteHandler = (id) => {
    noteService.deleteNote(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id))
    })
  }

  const editNoteHandler = (id, editedNote) => {
    noteService.update(id, editedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
    })
  }


  const notesToShow = showArchived
    ? notes.filter((note) => note.archived)
    : notes.filter((note) => !note.archived)

    return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Notes</h1>

      <div className="d-flex justify-content-center mb-4">
        <Button 
          onClick={() => setShowArchived(!showArchived)}
          className="btn btn-primary"
        >{showArchived ? "Show Unarchived Notes" : "Show Archived Notes"} </Button>
      </div>

      <ul className="list-group mb-4">
        {notesToShow.map((note) => (
          <li key={note.id} className="list-group-item mb-2 shadow-sm rounded">
            <Note
              note={note}
              toggleArchivement={() => handlerArchive(note.id)}
              deleteHandler={() => deleteHandler(note.id)}
              editHandler={editNoteHandler}
            />
          </li>
        ))}
      </ul>

      <form onSubmit={addNote} className="card p-3 shadow-sm">
        <div className="mb-3">
          <input
            value={newNote.title}
            name="title"
            onChange={handleChange}
            placeholder="Title"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <textarea
            value={newNote.content}
            name="content"
            onChange={handleChange}
            placeholder="Content"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Save</button>
      </form>
    </div>
  )
}

export default App