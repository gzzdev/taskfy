import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./presentation/layout/AppLayout";
import Dashboard from "./presentation/pages/Dashboard/Dashboard";
import Workspace from "./presentation/pages/Workspace/Workspace";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          {/* Sidebar option routes */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route index path="/task" element={<Dashboard />} />
            <Route index path="/setting" element={<Dashboard />} />
            
            {/* Dynamic workspacing */}
            <Route path="workspace" element={<Workspace />}>
              <Route index path="project" element={<Workspace />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
