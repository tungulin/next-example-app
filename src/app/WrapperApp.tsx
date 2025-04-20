import React, { PropsWithChildren, useEffect } from "react";

export const WrapperApp = ({ children }: PropsWithChildren) => {
//   useEffect(() => {});

  return <div>{children}</div>;
};