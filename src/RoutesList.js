import { Route, Routes, Navigate } from "react-router-dom";
import CompanyDetail from "./CompanyDetail.js";
import CompaniesList from "./CompaniesList.js";
import JobsList from "./JobsList.js";
import Homepage from "./Homepage.js";
import ProfileForm from "./ProfileForm.js";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";

/**
 * Renders a RoutesList component.
 *
 * State: none
 * Props: handleLogin, handleSignup, handleProfileEdit
 *
 * App -> RoutesList
 */

function RoutesList({handleLogin, handleSignup, handleProfileEdit}) {
    return (
        <div className="RoutesList">
            <Routes>
                <Route path="/companies/:handle" element={<CompanyDetail />} />
                <Route path="/companies" element={<CompaniesList />} />
                <Route path="/jobs" element={<JobsList />} />
                <Route path="/login" element={<LoginForm onSubmit={handleLogin} />} />
                {/* <Route path="/logout" /> TODO: Logging out? */}
                <Route path="/signup" element={<SignupForm onSubmit={handleSignup} />} />
                <Route path="/profile" element={<ProfileForm onSubmit={handleProfileEdit} />} />
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default RoutesList;
