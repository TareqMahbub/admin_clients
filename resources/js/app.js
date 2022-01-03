require("./bootstrap");
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/pages/Index";
import Register from "./components/pages/admin/Register";
import Login from "./components/pages/admin/Login";
import NotFound from "./components/pages/NotFound";
import ClientList from "./components/pages/clients/list";
import ClientDetails from "./components/pages/clients/details";
import ClientEdit from "./components/pages/clients/edit";
import ClientDelete from "./components/pages/clients/delete";
import Auth from "./auth";
import AddClient from "./components/pages/clients/add";

export const AuthContext = React.createContext();

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState(
        Auth.get("app.js")
    );

    return (
        <AuthContext.Provider
            value={{ authenticatedUser, setAuthenticatedUser }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/clients"
                        element={<ClientList perPage={5} />}
                    />

                    <Route path="/clients/add" element={<AddClient />} />
                    <Route path="/clients/:id" element={<ClientDetails />} />
                    <Route path="/clients/:id/edit" element={<ClientEdit />} />
                    <Route
                        path="/clients/:id/delete"
                        element={<ClientDelete />}
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
