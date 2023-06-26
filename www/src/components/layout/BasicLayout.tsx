import { type FC, type PropsWithChildren } from "react";
import cn from "classnames";

interface IBasicLayout extends PropsWithChildren {
  className?: string;
}
const BasicLayout: FC<IBasicLayout> = ({ className, children }) => (
  <div className={cn("max-w-screen mx-auto", className)}>{children}</div>
);

export default BasicLayout;
