import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loadingPic from "../../../public/loading.gif";

export default function Loading({ path = "login" }) {
  
  const [count, setCount] = useState(3);
  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate, path, location]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={loadingPic} alt="Loading" className="w-64" />
    </div>
  );
}
