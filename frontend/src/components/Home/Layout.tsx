import { FC, ReactNode } from "react";
import Background from "../../assets/images/bg.jpg";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen grid place-items-center"
      style={{ background: `url(${Background}) no-repeat center center/cover` }}
    >
      <main className="w-3/4 h-3/4 rounded bg-black/30 text-white p-8 backdrop-blur-md">
        {children}
      </main>
    </div>
  );
};
export default Layout;
