import { ReactElement } from "react";
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
      <main>{children}</main>
      <footer className={styles.footer}>All rights reserved</footer>
    </div>
  );
};
