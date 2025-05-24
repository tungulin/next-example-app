"use client";
import { createContext, ReactNode, useContext } from "react";

type ProviderProps<TValue> = {
  children: ReactNode;
  value: TValue;
};

export function createBareContext<
  InitValue,
  ActualValue = InitValue extends undefined
    ? null
    : InitValue extends null
      ? null
      : InitValue,
>(value?: InitValue) {
  const Context = createContext((value || null) as ActualValue);

  const useBareContext = () => useContext(Context);

  const Provider = ({ children, value }: ProviderProps<ActualValue>) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return [Provider, useBareContext] as const;
}
