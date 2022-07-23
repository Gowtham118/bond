import React, { useCallback, useEffect, useState } from "react";
import { UilCheckCircle, UilTimes, UilExclamationTriangle } from "@iconscout/react-unicons";

const Notification = ({
  dispatch,
  id,
  message = "default title",
  title = "default title",
  type = "info",
  position = "topR",
  ...props
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  const notificationWidth = 320;

  const closeNotification = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      // @ts-ignore
      dispatch({
        type: "remove_notification",
        id,
      });
    }, 400);
  }, [dispatch, id]);

  const startTimer = React.useCallback(() => {
    if (isClosing) return;
    const idInt = setInterval(() => {
      setBarWidth((prev) => {
        if (prev < notificationWidth) return prev + 1;

        clearInterval(idInt);
        return prev;
      });
    }, 20);
  }, [isClosing, setBarWidth]);

  useEffect(() => {
    if (isClosing) return;
    if (barWidth === notificationWidth) closeNotification();
  }, [barWidth, isClosing, closeNotification]);

  useEffect(() => startTimer(), [startTimer]);

  const animateDirection = `${isClosing ? "animate-widtho" : "animate-widthi"}`;
  const titleColor = `${type === "info" ? "text-white" : "text-red-500"}`;
  const barColour = `${type === "info" ? " bg-primary" : "bg-red-500"}`;
  return (
    <div
      className={`bg-black-800 flex rounded-lg m-4 pt-4 pr-4 pb-4 pl-4 relative w-80 overflow-hidden z-40 ${animateDirection}`}
      {...props}>
      <div className='flex items-center justify-center rounded-full'>
        {type === "info" ? (
          <UilCheckCircle size='30px' color='rgb(44 201 149)' />
        ) : (
          <UilExclamationTriangle size='30px' color='rgb(239 68 68)' />
        )}
      </div>
      <div className='flex-wrap ml-4 w-max'>
        <div className={`inline-block font-bold m-0 break-words leading-6 ${titleColor} text-lg`}>
          {title}
        </div>
        <div className='absolute cursor-pointer top-4 right-4' onClick={closeNotification}>
          <UilTimes color='rgb(249 250 251)' />
        </div>
        <div className='inline-block font-semibold break-words text-grey-400'>{message}</div>
      </div>
      <div className={`${barColour} absolute bottom-0 h-1 left-0`} style={{ width: barWidth }} />
    </div>
  );
};

export default Notification;
