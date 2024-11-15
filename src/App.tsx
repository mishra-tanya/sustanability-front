import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Login from './components/Login';
import PrivateRoutes from './components/PrivateRoutes';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import TestSeries from './components/TestSeries';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to My React App</h1>} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes>
                } />
                <Route path="/class/:className" element={
                    <PrivateRoutes>
                        <Goals />
                    </PrivateRoutes>
                } />
                <Route path="/class/:className/goal/:goal" element={
                    <PrivateRoutes>
                        <TestSeries/>
                    </PrivateRoutes>
                } />
            </Routes>
        </Router>
    );
};

export default App;
