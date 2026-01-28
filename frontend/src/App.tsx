import { Sidebar } from './components/layout/Sidebar';
import { NoteList } from './components/layout/NoteList';
import { Editor } from './components/layout/Editor';
import { StoreProvider } from './store/StoreContext';
import { useShortcuts } from './hooks/useShortcuts';

const AppContent = () => {
  useShortcuts();
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <NoteList />
      <Editor />
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
