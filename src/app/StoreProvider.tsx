"use client";

import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore, persistor } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  const { store, persistor } = storeRef.current;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;