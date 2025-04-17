import { useCallback, useRef } from "react";

//TODO
export const useStateRef = <T>(initialValue: T) => {
  const ref = useRef(initialValue);

  const setRef = (newState: T) => {
    ref.current = newState;
  };

  return [ref.current, setRef] as [T, (newState: T) => void];
};
