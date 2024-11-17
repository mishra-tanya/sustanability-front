import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import Login from './components/Auth/LoginForm';
import PrivateRoutes from './components/PrivateRoutes';
import Dashboard from './components/Goals/Dashboard';
import Goals from './components/Goals/Goals';
import TestsGoals from './components/Goals/Testsgoal';
import Home from './components/Home';
import QTest from './components/Goals/Tests/QTest';
import DashboardLayoutBasic from './components/Goals/Dashboard/Dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={
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
                        <TestsGoals/>
                    </PrivateRoutes>
                } />
                <Route path="/class/:className/goal/:goal/:test" element={
                    <PrivateRoutes>
                        <QTest/>
                    </PrivateRoutes>
                } />
                <Route path="/dashboard" element={
                    <PrivateRoutes>
                        <DashboardLayoutBasic/>
                    </PrivateRoutes>
                } />
            </Routes>
            
        </Router>
    );
};

export default App;
