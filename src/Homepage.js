import { useContext } from 'react';
import userContext from './userContext';

/**
 * Renders a Homepage component.
 *
 * State: none
 * Props: none
 *
 * App -> RoutesList -> Homepage
 */

function Homepage() {
    const { firstName } = useContext(userContext);
    const isLoggedIn = firstName !== undefined;

    return (
        <div className="Homepage">
            <p>Find your future here...</p>
            {
                isLoggedIn
                // TODO: make this a ternary? to display login/signup buttons again?
                ? <p>Welcome back {firstName}!</p>
                : <p>Hint: Sign up with a username/password/email (you can use 'something@email.com') or sign in with: <br />username: username<br />password: password</p>
            }
        </div>
    )
}

export default Homepage;
