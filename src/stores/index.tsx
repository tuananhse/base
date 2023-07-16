import React from 'react';
import {useLocalObservable} from 'mobx-react-lite';
import {AppStore} from './appStore';

const storeContext = React.createContext<AppStore | null>(null);

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  const store = useLocalObservable(() => new AppStore());
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
