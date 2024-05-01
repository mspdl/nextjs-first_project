import { navigationLinks } from "@/utils/data";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <ul className={styles.container}>
      {navigationLinks.map((link, index) => (
        <li
          key={index}
          className={`
            ${styles.linkItem} ${
            router.pathname === link.path ? styles.linkActive : ""
          }`}
        >
          <Link href={link.path}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
