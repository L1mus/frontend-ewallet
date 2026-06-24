import {Navigate, Route, Routes} from "react-router";

import LandingPage from "./pages/Landingpage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreatePin from "./pages/auth/CreatePin";

import DashboardLayout from "./components/templates/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import History from "./pages/dashboard/History";
import Transfer from "./pages/dashboard/Transfer";
import TransferDetail from "./pages/dashboard/TransferDetail";
import TopUp from "./pages/dashboard/TopUp";
import Profile from "./pages/dashboard/Profile";
import ChangePassword from "./pages/dashboard/ChangePassword";
import ChangePin from "./pages/dashboard/ChangePin";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

/**
 * Main Application Component (Root).
 * Configures routing, page lazy loading, and the global Suspense wrapper.
 * * @component
 * @returns {JSX.Element} The navigation structure for the entire application.
 */

function App() {
    return (
        <Routes>
            <Route element={<PublicRoute/>}>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="auth">
                    <Route path="login" element={<Login/>}/>
                    <Route path="forgot-password" element={<ForgotPassword/>}/>
                    <Route path="create-pin" element={<CreatePin/>}/>
                </Route>
                <Route path="/register" element={<Register/>}/>
            </Route>

            <Route element={<ProtectedRoute/>}>
                <Route element={<DashboardLayout/>}>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="history" element={<History/>}/>
                    <Route path="transfer" element={<Transfer/>}/>
                    <Route path="transfer/:id" element={<TransferDetail/>}/>
                    <Route path="topup" element={<TopUp/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="profile/change-password" element={<ChangePassword/>}/>
                    <Route path="profile/change-pin" element={<ChangePin/>}/>
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );
}

export default App;