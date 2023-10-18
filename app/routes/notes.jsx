import { json, redirect } from "@remix-run/node";
import NewNote, {links as newNoteLinks} from "../components/NewNote";
import NoteList, {links as noteListLinks} from "../components/NoteList"
import { getStoredNotes, storeNotes } from "../data/notes";
import { useActionData, useLoaderData } from "@remix-run/react";

export default function NotesPage() {
    const notes = useLoaderData();
    return (
        <main>
            <NewNote />
            <NoteList notes={notes}/>
        </main>
    )
}

export async function loader() {
    const notes = await getStoredNotes();
    return json(notes);
}

export async function action({request}) {
    const formData = await request.formData();
    const noteData = { //or Object.fromEntries(formData)
        title: formData.get('title'),
        content: formData.get('content')
    };

    if (noteData.title.trim().length < 5) {
        return {message: 'Title must be at least 5 characters long'}
    };

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect('/notes');
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()];
}