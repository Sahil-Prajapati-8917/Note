import { Sidebar } from './components/layout/Sidebar';
import { NoteList } from './components/layout/NoteList';
import { Editor } from './components/layout/Editor';
import { StoreProvider } from './store/StoreContext';

function App() {
  return (
    <StoreProvider>
      <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Sidebar />
        <NoteList />
        <Editor />
      </div>
    </StoreProvider>
  );
}

export default App;
