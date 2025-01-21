import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import LogSign from './pages/LogSign';
import Mainpage from './pages/Mainpage';
import EditNote from './pages/EditNote';
import NotePage from './pages/NotePage';
import Group from './pages/CreateGroup';

function App() {
    const checkSession = (session_id, navigate) => {
        const formData = new FormData();
        formData.append("id", session_id);

        const req = new XMLHttpRequest();
        req.open("POST", "http://localhost:2020/session");

        req.onload = () => {
            const isValidSession = req.responseText === "true";
            if (!isValidSession) {
                window.localStorage.removeItem("session_id");
                navigate("/logsign", { replace: true });
            } else if (isValidSession && window.location.pathname === "/logsign") {
                navigate("/", { replace: true });
            }
        };

        req.send(formData);
    };

    return (
        <BrowserRouter>
            <AppRoutes checkSession={checkSession} />
        </BrowserRouter>
    );
}

function AppRoutes({ checkSession }) {
    const navigate = useNavigate();

    useEffect(() => {
        const session_id = window.localStorage.getItem("session_id");
        if (session_id) {
            checkSession(session_id, navigate);
        } else {
            navigate("/logsign", { replace: true });
        }
    }, [navigate, checkSession]);

    return (
        <Routes>
            <Route path="/logsign" element={<LogSign />} />
            <Route path="/editnote" element={<EditNote />} />
            <Route path="/" element={<Mainpage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/viewnote" element={<NotePage/>}/>
            <Route path="/addgroup" element={<Group/>}/>
        </Routes>
    );
}

export default App;
