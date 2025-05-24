import React, { DependencyList, useEffect } from "react";

export const useUnmount = <T extends DependencyList | []>(
  callback: () => void,
  dependency?: T | []
) => {
  console.log("dependency", dependency);

  useEffect(
    () => {
      return () => {
        callback();
      };
    },
    dependency ? dependency : []
  );
};
