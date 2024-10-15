import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={twMerge(
        "px-8 py-4 bg-gradient-to-tr from-orange-500 to-purple-800 text-white outline font-bold text-lg rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
