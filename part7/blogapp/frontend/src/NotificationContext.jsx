import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;

    case 'CLEAR':
      return null;

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotify = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  const dispatch = notificationAndDispatch[1];

  return (payload) => {
    dispatch({ type: 'SET', payload });
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
  };
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
