import React, { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import calendarAnimation from "../assets/calendar.json";
import spinnerAnimation from "../assets/spinner.json";

const Loading = ({ loadingType }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  
  const options = {
    animationData: calendarAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const style = {
    height: 300,
    width: 300,
    margin: '100px auto',
  };

  const options2 = {
    animationData: spinnerAnimation,
    loop: true,
    autoplay: true,
  };
  const style2 = {
    height: 100,
    width: 100,
    margin: '20px auto',
  };

  if (loadingType === "calendar") {
    const { View } = useLottie(options, style);

    return (
      <div
        className="loading"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          transition: "visibility 0.5s",
        }}
      >
        {View}
      </div>
    );
  }

  if (loadingType === "spinner") {
    const { View } = useLottie(options2, style2);

    return <div className="loading">{View}</div>;
  }
};

export default Loading;
