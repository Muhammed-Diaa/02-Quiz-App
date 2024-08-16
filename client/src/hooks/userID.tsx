import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Result } from "../types/types";

const UserID = ({ children }: { children: JSX.Element }) => {
  const userID = useSelector((state: Result) => state.result.userID);
  return userID ? children : <Navigate to={"/"}></Navigate>;
};

export default UserID;
