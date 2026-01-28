import { AppProvider } from './store/AppContext';
import { AppShell } from './components/app/AppShell';
import { AppLayout } from './components/app/AppLayout';

function App() {
  return (
    <AppProvider>
      <AppShell>
        <AppLayout />
      </AppShell>
    </AppProvider>
  );
}

export default App;
