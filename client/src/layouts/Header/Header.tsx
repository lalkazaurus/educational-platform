import { useState } from "react";
import styles from "./header.module.css";
import LocaleSwitcher from "../../i18n/LocaleSwitcher/LocaleSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <span>APOLLO SCHOOL</span>
          </div>

          <div className={styles.centerNav}>
            <a href="#">Products</a>
            <a href="#">Solutions</a>
            <a href="#">Resources</a>
          </div>

          <div className={styles.rightSection}>
            <button className={styles.contactBtn}>Contact Sales</button>

            <LocaleSwitcher/>

            <div className={styles.dropdown}>
              <button
                className={styles.profileBtn}
                onClick={() => setOpen((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
                <div className={styles.personIcon}>P</div>
              </button>

              {open && (
                <div className={styles.dropdownContent}>
                  <div className={styles.dropdownItem}>Sign up</div>
                  <div className={styles.dropdownItem}>Log in</div>
                  <div className={styles.dropdownItem}>Settings</div>
                  <div className={styles.dropdownItem}>Help Center</div>
                  <div className={styles.dropdownItem}>Contact</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
