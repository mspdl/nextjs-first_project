import { navigationLinks } from "@/utils/data";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  // function checkActiveLink(currentPath: string) {
  //   if (currentPath === "/" && router.pathname !== "/") {
  //     return null;
  //   }
  //   if (router.pathname.indexOf(currentPath) === 0) {
  //     return styles.linkActive;
  //   }

  //   return null;
  // }

  return (
    <ul className={styles.container}>
      {navigationLinks.map((link, index) => (
        <li
          key={index}
          className={`
            ${styles.linkItem} ${
            link.path.includes(router.pathname) ? styles.linkActive : ""
          }`}
        >
          <Link href={link.path[0]}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
