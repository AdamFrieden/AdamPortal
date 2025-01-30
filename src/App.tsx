// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortalLayout from './components/PortalLayout';
import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeProvider';
import NinjaParty from './pages/NinjaParty';
import Travel from './pages/Travel';
import VerseCommander from './pages/VerseCommander';
import VerseCommanderDemo from './components/VerseCommanderDemo';

const App = () => {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main layout routes */}
          <Route element={<PortalLayout />}>
            <Route path="/" element={<MainContent />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/ninjaparty" element={<NinjaParty />} />
            <Route path="/versecommander" element={<VerseCommander />} />
          </Route>

          {/* Alternative layout routes */}
          <Route element={<VerseCommanderDemo />}>
            <Route path="/versecommanderdemo" element={<div />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
