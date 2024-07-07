import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Navbar from "../Navbar";
import styles from "./Layout.module.css";

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="font-bold text-3xl">My own project</h1>

        <ul>
          {router.locales?.map((locale, index) => (
            <li key={index}>
              <Link className="flex" href={"/"} locale={locale}>
                {locale}
              </Link>
            </li>
          ))}
        </ul>
        <p>Selected Language: {router.locale}</p>
      </header>
      <Navbar />
      <main>{children}</main>
      <footer className={styles.footer}>All rights reserved</footer>
    </div>
  );
};
