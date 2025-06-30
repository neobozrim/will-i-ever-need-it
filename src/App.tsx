import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ConceptPage from './pages/ConceptPage';
import AuthCallback from './pages/AuthCallback';
import { TestSupabase } from './components/TestSupabase';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="concepts/:slug" element={<ConceptPage />} />
            <Route path="test-supabase" element={<TestSupabase />} />
          </Route>
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;