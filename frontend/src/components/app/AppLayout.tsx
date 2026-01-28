import { Sidebar } from '../sidebar/Sidebar';
import { NoteList } from '../sidebar/NoteList';
import { Editor } from '../editor/Editor';

export const AppLayout = () => {
    return (
        <>
            <Sidebar />
            <NoteList />
            <Editor />
        </>
    );
};
