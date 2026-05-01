import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Login onLogin={() => setIsAuthenticated(true)} />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <DashboardLayout
                                onLogout={() => setIsAuthenticated(false)}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                >
                    <Route
                        index
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="my-tasks" element={<Tasks myTasks />} />
                    <Route path="settings" element={<Dashboard settings />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
