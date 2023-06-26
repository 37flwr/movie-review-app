import { type FC, type PropsWithChildren } from "react";

const Title: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="text-xl text-white font-semibold text-center">{children}</h1>
);

export default Title;
