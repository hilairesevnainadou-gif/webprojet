import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Devis from "./pages/Devis";
import Blog from "./pages/Blog";
import Projets from "./pages/Projets";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ActivateAccount from "./pages/ActivateAccount";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Backoffice/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/devis" element={<Devis />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/projets" element={<Projets />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/activate" element={<ActivateAccount />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Protected Backoffice Routes */}
              <Route
                path="/backoffice/*"
                element={
                  <ProtectedRoute roles={['admin', 'dev']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
