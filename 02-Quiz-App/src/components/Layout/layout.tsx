import { useEffect, useState } from "react";
import "./layout.css";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
// import { divide } from "lodash";

function Layout({ children }: { children: React.ReactNode }) {
  const [localTheme, setLocalTheme] = useState<string>();
  const [animate, setAnimate] = useState(false);

  const localStorageTheme = localStorage.getItem("theme-preference");

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 1000);

    return () => clearTimeout(timeout);
  }, [localTheme]);
  useEffect(() => {
    document.body.setAttribute("data-theme", localStorageTheme as string);
    setLocalTheme(localStorageTheme as string);
  }, [localStorageTheme]);

  const onClick = () => {
    // flip current
    const theme = localStorageTheme
      ? localStorageTheme === "light"
        ? "dark"
        : "light"
      : "light";

    localStorage.setItem("theme-preference", theme as string);
    setLocalTheme(theme as string);
    document.body.setAttribute(
      "localStorageTheme-theme",
      localStorageTheme as string
    );
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="mx-auto bg-inherit flex flex-col items-center w-[867px] justify-center gap-9 h-[calc(100vh-200px)]">
        <button onClick={onClick} className="flex justify-end w-full">
          {localTheme === "light" ? (
            <LuSun className={`h-10 w-10 ${animate && "theme-icon"}`} />
          ) : (
            <FaMoon className={`h-10 w-10 ${animate && "theme-icon"}`} />
          )}
        </button>
        <div className={`w-full flex flex-col gap-10`}>
          <h1
            className={`flex justify-center items-center text-[40px] w-[867px] border py-5 bg-gradient-to-r from-info to-warning`}
          >
            Quiz Application
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
