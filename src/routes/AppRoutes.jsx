import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Laptops from "../pages/Laptops";
import LaptopDetails from "../pages/LaptopDetails";
import AddLaptop from "../pages/AddLaptop";
import EditLaptop from "../pages/EditLaptop";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Favorites from "../pages/Favorites";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/laptops"
        element={<Laptops />}
      />

      <Route
        path="/laptops/:id"
        element={<LaptopDetails />}
      />

      <Route
        path="/add-laptop"
        element={<ProtectedRoute><AddLaptop /></ProtectedRoute>}
      />

      <Route
        path="/edit-laptop/:id"
        element={<ProtectedRoute><EditLaptop /></ProtectedRoute>}
      />
      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/logout"
        element={<Logout />}
      />

      <Route
        path="/favorites"
        element={<ProtectedRoute><Favorites /></ProtectedRoute>}
      />

    </Routes>
  );
}

export default AppRoutes;
