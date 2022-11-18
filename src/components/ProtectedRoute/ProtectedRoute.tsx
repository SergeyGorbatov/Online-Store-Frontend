import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { shallowEqual } from "react-redux";
import CircularIndeterminate from "components/Progress/Progress";
import { useAppSelector } from "hook";

const ProtectedRoute: FC<any> = () => {
  const { auth, errorAuth, loadingGetUserAuthentication } = useAppSelector(
    (state) => state.authentication,
    shallowEqual
  );

  if (!auth && errorAuth) {
    return <Navigate to="/auth/login" />;
  }

  return loadingGetUserAuthentication === "loading" ? (
    <CircularIndeterminate />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
