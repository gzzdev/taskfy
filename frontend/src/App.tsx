import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./presentation/layout/AppLayout";
import Dashboard from "./presentation/pages/Dashboard/Dashboard";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />}/>

          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
