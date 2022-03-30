import { useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { UserContext } from '../contexts/UserContext';
import { auth } from '../firebase-config';

const useAuth = () => {
  const { user, setUser, authError, setAuthError } = useContext(UserContext);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const isNewUser = () =>
    user?.metadata.creationTime === user?.metadata.lastSignInTime;

  const handleSignIn = async (signInMethod, e = {}) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      switch (signInMethod) {
        case 'email':
          e.preventDefault();
          await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
          break;

        case 'guest':
          await signInAnonymously(auth);
          break;

        default:
          return;
      }
    } catch (error) {
      setAuthError(error?.code);
      console.error(error?.code);
    }
  };

  const handleSignUp = async (signUpMethod, event = {}) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      switch (signUpMethod) {
        case 'email':
          event.preventDefault();
          await createUserWithEmailAndPassword(
            auth,
            signUpEmail,
            signUpPassword
          );
          break;

        case 'guest':
          await signInAnonymously(auth);
          break;

        default:
          return;
      }
    } catch (error) {
      setAuthError(error?.code);
      console.error(error?.code);
    }
  };

  const signout = () => signOut(auth);

  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  return {
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    authError,
    setAuthError,
    handleSignIn,
    handleSignUp,
    signout,
    isNewUser,
  };
};

export default useAuth;
