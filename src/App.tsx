import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Registration from "components/Registration/Registration";
import Authorization from "components/Authorization/Authorization";
import Home from "components/Home/Home";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import Profile from "components/Profile/Profile";
import Frame from "components/Frame/Frame";
import AnonymousRoute from "components/AnonymousRoute/AnonymousRoute";
import Basket from "components/Basket/Basket";
import { useAppDispatch } from "hook";
import { getUserAuthentication } from "store/authenticationSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAuthentication());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Frame />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
      <Route element={<AnonymousRoute />}>
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/login" element={<Authorization />} />
      </Route>
    </Routes>
  );
};

export default App;
