import styles from "./Footer.module.css";

export default function Footer() {
  const footerNavs = [
    {
      label: "Resources",
      items: [
        { href: "#", name: "Contact" },
        { href: "#", name: "Support" },
        { href: "#", name: "Documentation" },
        { href: "#", name: "Pricing" },
      ],
    },
    {
      label: "About",
      items: [
        { href: "#", name: "Terms" },
        { href: "#", name: "License" },
        { href: "#", name: "Privacy" },
        { href: "#", name: "About Us" },
      ],
    },
    {
      label: "Explore",
      items: [
        { href: "#", name: "Showcase" },
        { href: "#", name: "Roadmap" },
        { href: "#", name: "Languages" },
        { href: "#", name: "Blog" },
      ],
    },
    {
      label: "Company",
      items: [
        { href: "#", name: "Partners" },
        { href: "#", name: "Team" },
        { href: "#", name: "Careers" },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.newsletterText}>
            <h3>Get our beautiful newsletter straight to your inbox.</h3>
          </div>
          <div className={styles.newsletterForm}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className={styles.form}
            >
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className={styles.navWrapper}>
          {footerNavs.map((group, idx) => (
            <ul className={styles.navList} key={idx}>
              <h4>{group.label}</h4>
              {group.items.map((el, subIdx) => (
                <li key={subIdx}>
                  <a href={el.href}>{el.name}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>© 2025 Float UI Inc. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-github"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
