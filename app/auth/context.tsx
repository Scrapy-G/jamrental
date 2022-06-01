import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as SplashScreen from "expo-splash-screen";

const AuthContext = createContext<any>(null);

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
