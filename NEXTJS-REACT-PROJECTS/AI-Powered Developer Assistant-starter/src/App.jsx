import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import "./utils/index.css";
import ApiKeyPrompt from "./components/ApiKeyPrompt";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="/auth" element={<Login />} />
          <Route
            path="/api-key"
            element={
              <PrivateRoute>
                <ApiKeyPrompt />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
