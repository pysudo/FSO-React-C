import React, { useState } from "react";


const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState("");

    const addNote = (event) => {
        event.preventDefault();
        const newObject = {
            content: newNote,
            important: false
        };
        createNote(newObject);
        setNewNote("");
    };


    const handleNoteChange = (event) => {

        setNewNote(event.target.value);
    };

    return (
        <div className="formDiv">
            <h2>Create a new note</h2>

            <form onSubmit={addNote}>
                <input
                    id="txtNote"
                    onChange={handleNoteChange}
                    value={newNote}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};


export default NoteForm;