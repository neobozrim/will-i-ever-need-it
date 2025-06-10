import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ConceptPage from './pages/ConceptPage';
import { TestSupabase } from './components/TestSupabase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="concepts/:slug" element={<ConceptPage />} />
          <Route path="test-supabase" element={<TestSupabase />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;