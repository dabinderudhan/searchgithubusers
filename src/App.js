import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <HashRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </HashRouter>
      </Router>
    </AuthWrapper>
  );
}

export default App;
