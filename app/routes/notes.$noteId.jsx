import { Link, useLoaderData } from "@remix-run/react";
import styles from "../styles/note-details.css"
import { getStoredNotes } from "../data/notes";
import { json } from "@remix-run/node";

export default function NoteDetails() {
    const selectedNote = useLoaderData();

    return <main id="note-details">
        <header>
            <nav>
                <Link to="/notes">Back to all Notes</Link>
            </nav>
            <h1>{selectedNote.title}</h1>
        </header>
        <p id="note-details-content">{selectedNote.content}</p>
    </main>
}

export async function loader({params}) {
   const notes = await getStoredNotes();
   const noteId = params.noteId;
   const selectedNote = notes.find(note => note.id === noteId)
   return json(selectedNote)
}
export function links() {
    return [{rel: 'stylesheet', href: styles}]
}