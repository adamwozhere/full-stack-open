import { createContext, useState, useContext } from 'react';

interface NotificationContextValue {
  notification: string | null;
  notify: (text: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

// unsure if this is correct as it is giving a 'Fast Refresh only works when a file exports components.' error
export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotify must be inside a NotificationContextProvider');
  }
  return context;
};

export const NotificationContextProvider = (props: React.PropsWithChildren) => {
  // having to use null! here: don't know if this is correct
  const [notification, setNotification] = useState<string>(null!);

  const notify = (text: string) => {
    setNotification(text);
    setTimeout(() => {
      // having to use null! here again
      setNotification(null!);
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

