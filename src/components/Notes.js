import React, { useState, useEffect, useRef } from "react";

import LoginForm from "./LoginForm";
import NoteForm from "./NoteForm";
import Toggleable from "./Toggleable";
import Note from "./Note";
import noteService from "../services/notes";
import loginService from "../services/login";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return (
        <div className="error">
            {message}
        </div>
    );
};

const Footer = () => {
    const footerStyle = {
        color: "green",
        fontStyle: "italic",
        fontSize: 16
    };

    return (
        <div style={footerStyle}>
            <br />
            <em>
                Note app, Department of Computer Science, University of Helsinki 2021
            </em>
        </div>
    );
};


const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);


    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true);

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };
        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => {
                    return (note.id !== id) ? note : returnedNote;
                }));
            })
            .catch(() => {
                let errorMessage = `the note '${note.content}' was already`;
                errorMessage += " deleted from server";
                setErrorMessage(errorMessage);
                setTimeout(() => setErrorMessage(null), 5000);
                setNotes(notes.filter(note => note.id !== id));
            });
    };

    const createNote = (newNote) => {
        noteFormRef.current.toggleVisibility();
        noteService
            .create(newNote)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
            });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username: username, password: password
            });
            noteService.setToken(user.token);
            window.localStorage.setItem(
                "loggedNoteappUser", JSON.stringify(user)
            );
            setUser(user);
            setUsername("");
            setPassword("");
        }
        catch (exception) {
            setErrorMessage("Wrong Credentials");
            setTimeout(() => setErrorMessage(null), 5000);
        }
    };

    const loginForm = () => {
        return (
            <Toggleable buttonLabel="login">
                <LoginForm
                    username={username}
                    handleUserNameChange={({ target }) => {
                        setUsername(target.value);
                    }}
                    password={password}
                    handlePasswordChange={({ target }) => {
                        setPassword(target.value);
                    }}
                    handleLogin={handleLogin}
                />
            </Toggleable>
        );
    };

    const noteFormRef = useRef();
    const noteForm = () => {
        return (
            <Toggleable buttonLabel="new note" ref={noteFormRef}>
                <NoteForm
                    createNote={createNote}
                />
            </Toggleable>
        );
    };

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes);
            });
    }, []);
    useEffect(() => {
        const userDetails = window.localStorage.getItem("loggedNoteappUser");
        if (userDetails) {
            const user = JSON.parse(userDetails);
            noteService.setToken(user.token);
            setUser(user);
        }
    }, []);

    return (
        <>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {user === null
                ? loginForm()
                : <div>
                    <p>{user.name} logged-in</p>
                    {noteForm()}
                </div>
            }

            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? "important" : "all"}
            </button>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id}
                        note={note}
                        toggleImportance={() => { toggleImportanceOf(note.id); }}
                    />
                )}
            </ul>
            <Footer />
        </>
    );
};


export default Notes;