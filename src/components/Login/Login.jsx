import React from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const githubProvider = new GithubAuthProvider();



    const handleGoogleSignin = () =>{
        signInWithPopup(auth, googleProvider)
        .then(result =>{
            const loggedInUser = result.user;
            console.log(loggedInUser)
            setUser(loggedInUser)
        })
        .catch(error =>{
            console.log('error', error.message)
        })
    }

    const handleGithubSignin = () =>{
        signInWithPopup(auth, githubProvider)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser)
        })
        .catch(error =>{
            console.log(error)
        })
    }


    const handleSignOut = () =>{
        signOut(auth)
        .then(result =>{
            console.log(result);
            setUser(null);
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            {/* user ? logout : signin */}
            {user?
                <button onClick={handleSignOut}>Sign Out</button> :
                <div>
                    <button onClick={handleGoogleSignin}>Google Login</button>
                    <button onClick={handleGithubSignin}>Github Login</button>
                </div>
            }


            {
                user && <div>
                    <h3>User : {user.displayName}</h3>
                    <p>Email : {user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;