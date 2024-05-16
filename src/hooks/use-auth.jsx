import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth as authentication } from "../config/firebase.config";
import { selectAuth, setAuth } from "../redux/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email, password) => {
    const user = await signInWithEmailAndPassword(
      authentication,
      email,
      password
    );
    dispatch(
      setAuth({
        isAuthenticated: true,
        user: {
          email: user.email,
          accessToken: user.accessToken,
          uid: user.uid,
        },
      })
    );
  };

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setAuth({
            isAuthenticated: true,
            user: {
              email: user.email,
              accessToken: user.accessToken,
              uid: user.uid,
            },
          })
        );
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(authentication);
      dispatch(setAuth({ isAuthenticated: false, user: null }));
      navigate("/login");
    } catch (error) {
      console.log("error logging out:", error);
    }
  };

  return { auth, login, logout, loading };
};

export default useAuth;
