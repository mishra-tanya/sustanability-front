import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import Login from './components/Auth/LoginForm';
import PrivateRoutes from './components/PrivateRoutes';
import Dashboard from './components/Goals/Dashboard';
import Goals from './components/Goals/Goals';
import TestsGoals from './components/Goals/Testsgoal';
import Home from './components/Home';
import QTest from './components/Goals/Tests/QTest';
import DashboardLayoutBasic from './components/Goals/Dashboard/Dashboard';
import Results from './components/Goals/Results/Result';
import Verification from './components/VerifyCertificate/Verification';
import AdminHome from './admin/AdminHome';
import AdminPrivateRoutes from './components/AdminPrivateRoutes';
import NotFound from './components/Error/NotFound';
import PaymentDetails from './components/Goals/common/PaymentDetails';
import PaymentSuccess from './components/Goals/common/PaymentSuccess';
import CertificateView from './components/Goals/common/CertificateView';
import PaymentFailed from './components/Goals/common/PaymentFailed';

const App: React.FC = () => {
    return (
            <Routes>
                {/* publicroutes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/verification/:certificateId" element={<Verification />} />

                {/* protected  */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/class" element={<Dashboard />} />
                    <Route path="/class/:className" element={<Goals />} />
                    <Route path="/class/:className/goal/:goal" element={<TestsGoals />} />
                    <Route path="/class/:className/goal/:goal/:test" element={<QTest />} />
                    <Route path="/dashboard" element={<DashboardLayoutBasic />} />
                    <Route path="/results/:classId/:goalId/:testId" element={<Results />} />
                    <Route path="/payment-details" element={<PaymentDetails/>} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/payment-failed" element={<PaymentFailed />} />
                </Route>
                
                <Route path="/certificate-view" element={<CertificateView />} />

                {/* admin protcted paths  */}
                <Route element={<AdminPrivateRoutes />}>
                    <Route path="/admin/home" element={<AdminHome/>}/>
                </Route>

                <Route path="*" element={<NotFound/>}/>

            </Routes>
    );
};

export default App;
