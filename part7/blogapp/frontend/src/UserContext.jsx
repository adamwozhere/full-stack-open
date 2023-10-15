import { createContext, useReducer, useContext } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;

    case 'SET_TOKEN':
      return { ...state, token: action.payload };

    case 'UNSET':
      return null;

    default:
      return state;
  }
};

const UserContext = createContext();

// use hooks
export const useUser = () => {
  const userAndDispatch = useContext(UserContext);

  return userAndDispatch;
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
