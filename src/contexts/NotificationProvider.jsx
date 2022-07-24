import React, { FC, useContext, useMemo, useReducer } from "react";
import Notification from "../components/notification/Notification";

const NotificationContext = React.createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add_notification":
      return [...state, { ...action.payload }];
    case "remove_notification":
      return state.filter((toast) => toast.id !== action.id);
    default:
      return state;
  }
}

export const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toasts = useMemo(() => {
    const toaster= {
      topR: [],
      bottomR: [],
    };
    state.forEach((toast) => toaster[toast.position]?.push(toast));

    return (Object.keys(toaster)).map((pos) => {
      const position = `${pos === "topR" ? "right-10 top-24" : "right-10 bottom-10"}`;
      return (
        <div className={`fixed z-40 ${position}`} key={`container-${pos}`}>
          {toaster?.[pos]?.map((toast) => (
            <Notification
              key={toast.id}
              id={toast.id || String(Date.now())}
              dispatch={dispatch}
              {...toast}
            />
          ))}
        </div>
      );
    });
  }, [state]);

  return (
    <NotificationContext.Provider value={dispatch}>
      {toasts}
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  if (dispatch === undefined) {
    throw new Error("useNotification hook must be used within a NotificationProvider");
  }

  return (props) => {
    dispatch({
      type: "add_notification",
      payload: {
        id: String(Date.now()),
        ...props,
      },
    });
  };
};

export default useNotification;
