import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const GuestRoute = () => {
  const { user, loading } = useContext(UserContext);

  return (
    <>
      {loading && <div className="text-center py-10 text-xl">Loading...</div>}

      {!loading && !user && (
        <div>
          <Outlet />
        </div>
      )}

      {!loading && user && <Navigate to="/home" replace />}
    </>
  );
};

export default GuestRoute;