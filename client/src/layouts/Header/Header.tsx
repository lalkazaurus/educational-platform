import { useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <span>LOGO</span>
          </div>

          <div className={styles.centerNav}>
            <a href="#">Products</a>
            <a href="#">Solutions</a>
            <a href="#">Resources</a>
          </div>

          <div className={styles.rightSection}>
            <button className={styles.contactBtn}>Contact Sales</button>

            <button className={styles.iconBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.globeIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 
                  10 10 10 10-4.48 10-10S17.52 2 
                  12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 
                  8-8 8 3.59 8 8-3.59 8-8 
                  8z" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
            </button>

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
