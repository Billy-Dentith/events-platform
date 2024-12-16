import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Events from "./pages/Events";
import MyEvents from "./pages/MyEvents";
import StaffDashboard from "./pages/StaffDashboard";
import StaffRoute from "./components/StaffRoute";
import AuthRoute from "./components/AuthRoute";
import Unauthorised from "./pages/Unauthorised";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/staff-dashboard" element={
              <StaffRoute>
                <StaffDashboard />
              </StaffRoute>
            } />
            <Route path="/account" element={<AuthRoute />} />
            <Route path="/unauthorised" element={<Unauthorised />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
