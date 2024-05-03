import { navigationLinks } from "@/utils/data";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  function checkActiveLink(currentPath: string) {
    if (currentPath === "/" && router.pathname !== "/") {
      return null;
    }
    if (router.pathname.indexOf(currentPath) === 0) {
      return styles.linkActive;
    }

    return null;
  }

  return (
    <ul className={styles.container}>
      {navigationLinks.map((link, index) => (
        <li
          key={index}
          className={`
            ${styles.linkItem} ${checkActiveLink(link.path)}`}
        >
          <Link href={link.path}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
