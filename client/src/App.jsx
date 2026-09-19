import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import InterviewSetup from "./Pages/InterviewSetup";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Report from "./Pages/Report";
import Footer from "./components/Footer";
import Profile from "./Pages/Profile";
import Pricing from "./Pages/Pricing";

const App = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register", "/profile", "/report"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoutes>
              <InterviewSetup />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoutes>
              <Report />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/pricing"
          element={
            <ProtectedRoutes>
              <Pricing />
            </ProtectedRoutes>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default App;
