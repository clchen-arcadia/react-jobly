import { React } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";

/**
 * Renders a Navigation component
 *
 * State: none
 * Props: username
 *        handleLogout: logout callback function
 *
 * App -> Navigation
 */

function Navigation({ username, handleLogout }) {
    const isLoggedIn = username !== undefined;
    //TODO: get username out of context
    return (
        <nav className="Navigation">
            <div className="Navigation-homepage-link">
                <Link to="/">Jobly</Link>
            </div>
            {
                isLoggedIn
                    ? <div className="Navigation-data-links">
                        <NavLink to="/jobs">Jobs</NavLink>
                        <NavLink to="/companies">Companies</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink
                            to="/logout"
                            onClick={handleLogout}
                        >
                            Logout {username}
                        </NavLink>
                    </div>
                    : <div className="Navigation-data-links">
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Signup</NavLink>
                    </div>
            }
        </nav>
    );
}

export default Navigation;
