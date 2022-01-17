import { useLocation } from "react-router-dom";

export const isActive = (actualPage) => {
  const location = useLocation();
  // console.log(location);

  return location.pathname === actualPage;
};
