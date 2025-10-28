import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Note = ({ note, toggleArchivement, deleteHandler, editHandler }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ title: note.title, content: note.content });

  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    editHandler(note.id, editedNote); // call parent handler to update
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedNote({ title: note.title, content: note.content }); // reset edits
  }

  const label = note.archived ? 'Unarchive' : 'Archive'

  return (
    <Card className="my-3 shadow-sm">
      <Card.Body>
      {isEditing ? (
        <>
          <Form.Control
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            placeholder="Title"
            className="mb-2"
          />
          <Form.Control
            as="textarea"
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            placeholder="Content"
            className="mb-2"
            rows={3}
          />
          <div className="d-flex gap-2">
            <Button variant="success" onClick={handleSave}>Save</Button>
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          </div>
        </>
      ) : (
        <>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
          <Button variant="primary" onClick={toggleArchivement}>{label}</Button>
          <Button variant="danger" onClick={deleteHandler} >Delete</Button>
          <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
        </>
      )}      
      </Card.Body>
    </Card>
  );
}

export default Note