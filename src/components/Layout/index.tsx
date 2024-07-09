import { useTranslation } from "next-i18next";
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

  const { t } = useTranslation("common");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="font-bold text-3xl">{t("title")}</h1>

        <ul>
          {router.locales?.map((locale, index) => (
            <li key={index}>
              <Link className="flex" href={"/"} locale={locale}>
                {locale}
              </Link>
            </li>
          ))}
        </ul>
        <p>{t("choosen_language", { language: router.locale })}</p>
      </header>
      <Navbar />
      <main>{children}</main>
      <footer className={styles.footer}>{t("footer.rights")}.</footer>
    </div>
  );
};
