import React, { useEffect } from "react";
import "./styles.css";

const NotFound: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("Square");

    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = -e.clientX / 90;
      const y = -e.clientY / 90;
      container.style.right = `${x}px`;
      container.style.bottom = `${y}px`;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      container.style.right = `${e.gamma ? e.gamma / 3 : 0}px`;
      container.style.bottom = `${e.beta ? e.beta / 3 : 0}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  return (
    <div className="container">
      <div className="Square404" id="Square">
        <div className="Square">
          <h1> 404 <br />Page Not Found</h1>
        </div>
      </div>
      
      {/* Texts */}
      <div className="texts">
        <h4 className="oops">Oops! Page not found</h4>
        <p>The page you are looking for does not exist. Go back to the main page or search.</p>
        <a href="/" className="btn">Back to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
