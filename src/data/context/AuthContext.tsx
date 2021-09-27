import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";
import Cookies from "js-cookie";

//interface using User interface in ../model
interface AuthContextProps {
  user?: User;
  loading?: boolean;
  loginGoogle?: () => Promise<void>;
  loginPassword?: (email: string, password: string) => Promise<void>;
  createUser?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

// function that will normalize the data,
// returning a JS object with each information obtained from Firebase.
async function userNormalized(userFirebase: firebase.User) {
  const token = await userFirebase.getIdToken();
  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName,
    email: userFirebase.email,
    token,
    provider: userFirebase.providerData[0].providerId,
    imageUrl: userFirebase.photoURL,
  };
}

//Every time a refresh happens, the user is logged out. Use a cookie
// to know that the user has already been logged in.

function handleCookie(logged: boolean) {
  if (logged) {
    Cookies.set("system-template-project-mpasquini-auth", logged, {
      expires: 3,
    });
  } else {
    Cookies.remove("system-template-project-mpasquini-auth");
  }
}

export function AuthProvider(props) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  //It will check if there is any data in the file config from the firebase folder.
  //If negative, it will call the Firebase server.
  //It will return the server's response object as property to sessionConfig.

  async function loginGoogle() {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      await sessionConfig(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loginPassword(email, password) {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      await sessionConfig(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function createUser(email, password) {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      await sessionConfig(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  //it will check if the email field exists,
  //if so, it will take the user's token and normalize the data,
  //sending to the userNormalized function,
  //which will return a JS object with each piece of data,
  //where user data will be stored in user with setUser state.
  //using finally will guarantee that even if an error
  //in the firebase response occurs, the loading will be false.
  async function sessionConfig(firebaseUser) {
    if (firebaseUser?.email) {
      const sessionUser = await userNormalized(firebaseUser);
      setUser(sessionUser);
      handleCookie(true);
      setLoading(false);
      return sessionUser.email;
    } else {
      setUser(null);
      handleCookie(false);
      setLoading(false);
      return false;
    }
  }

  //It will call the sessionConfig function, with a null parameter,
  //which will trigger the function's else loop,
  //removing the cookie and removing the user's session.
  async function logout() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await sessionConfig(null);
    } finally {
      setLoading(false);
    }
  }

  //The useEffect will only happen if the created cookie exists.
  //Documentation - Adds an observer for changes to the signed-in user's ID token,
  //which includes sign-in, sign-out, and token refresh events.
  //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onidtokenchanged
  useEffect(() => {
    if (Cookies.get("system-template-project-mpasquini-auth")) {
      const cancel = firebase.auth().onIdTokenChanged(sessionConfig);
      return () => cancel();
    }else{
      setLoading(false)
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginGoogle,
        loginPassword,
        createUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
