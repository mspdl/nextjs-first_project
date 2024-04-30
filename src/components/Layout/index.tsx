import { ReactElement } from "react";
import Navbar from "../Navbar";
import styles from "./Layout.module.css";

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="font-bold text-3xl">My own project</h1>
      </header>
      <Navbar />
      <main>{children}</main>
      <footer className={styles.footer}>All rights reserved</footer>
    </div>
  );
};
