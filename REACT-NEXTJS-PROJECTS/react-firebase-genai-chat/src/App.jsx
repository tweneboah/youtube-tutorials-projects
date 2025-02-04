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
  const [user] = useAuthState(auth);

  const hasApiKey = () => {
    return !!localStorage.getItem("gemini_api_key");
  };

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
                {hasApiKey() ? <Chat /> : <Navigate to="/api-key" />}
              </PrivateRoute>
            }
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="/api-key" /> : <Login />}
          />
          <Route
            path="/api-key"
            element={
              <PrivateRoute>
                {hasApiKey() ? <Navigate to="/chat" /> : <ApiKeyPrompt />}
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
