import {initializeApp} from "firebase/app";
// Authentication
import {createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail, updateProfile} from "firebase/auth";
import {EmailAuthProvider} from "firebase/auth/web-extension";
// Database
import {getFirestore, updateDoc, doc, setDoc, getDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

//! --------------- Authentication Start --------------- !//
// Login
export const firebaseLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    return error.message;
  }
};

// Register
export const firebaseRegister = async (name, email, password) => {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      try {
        await updateProfile(auth.currentUser, {displayName: name});
        const links = [];
        const responseFirebaseAddUserToDatabase = await firebaseAddUserToDatabase(user.displayName, user.email, user.photoURL, user.uid, links);
        return responseFirebaseAddUserToDatabase;
      } catch (error) {
        return error.message;
      }
    }
    return user;
  } catch (error) {
    return error.message;
  }
};

// Update Name And Photo
export const firebaseUptadeUserDetails = async (name, photo) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: `${name}`,
      photoURL: `${photo}`,
    });
    return "ok";
  } catch (error) {
    return error.message;
  }
};

// Update Email
export const firebaseUpdateEmail = async (oldEmail, newEmail, password) => {
  try {
    const credential = EmailAuthProvider.credential(oldEmail, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updateEmail(auth.currentUser, newEmail);

    return "ok";
  } catch (error) {
    return error.message;
  }
};

// Logout
export const firebaseSingOut = async () => {
  try {
    await signOut(auth);
    return "Çıkış yapıldı";
  } catch (error) {
    return error.message;
  }
};
//! --------------- Authentication End --------------- !//

//! --------------- Database Start --------------- !//

export const firebaseAddUserToDatabase = async (name, email, photoURL, uid, links) => {
  try {
    await setDoc(doc(db, "users", `${name}.${uid[4] + uid[2]}`), {
      firstName: name,
      lastName: "",
      email,
      photoURL,
      uid,
      links,
    });
    return "ok";
  } catch (error) {
    return error.message;
  }
};

export const firebaseGetLinks = async (userDomainName) => {
  const docRef = doc(db, "users", userDomainName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const firebaseUpdateLink = async (userDocument, firstName, lastName, photo, email, links) => {
  try {
    const location = `/users/${userDocument}`;
    await updateDoc(doc(db, location), {
      firstName,
      lastName,
      photoURL: photo,
      email,
      links,
    });
    return "ok";
  } catch (error) {
    return error.message;
  }
};
//! --------------- Database End --------------- !//
