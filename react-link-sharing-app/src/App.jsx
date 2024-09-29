// Router DOM
import {Route, Routes} from "react-router-dom";
// Pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login-page";
import CreateUserPage from "./pages/create-user-page";
import UserPage from "./pages/user-page";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:user" element={<UserPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-user" element={<CreateUserPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
