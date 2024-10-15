import { FC, ReactNode } from "react";
import Background from "../assets/images/bg.jpg";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen grid place-items-center p-8 md:p-0"
      style={{ background: `url(${Background}) no-repeat center center/cover` }}
    >
      <main className="w-full md:w-3/4 h-full md:h-3/4  rounded-2xl bg-black/30 text-white backdrop-blur-md">
        {children}
      </main>
    </div>
  );
};
export default Layout;
