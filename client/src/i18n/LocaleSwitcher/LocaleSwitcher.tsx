import { useTranslation } from "react-i18next";
import styles from "./LocaleSwitcher.module.css";
import { supportedLngs } from "../config";
import LangIcon from "../LangIcon/LangIcon";

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className={styles.localeSwitcher}>
      <LangIcon />

      <select
        className={styles.select}
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {Object.entries(supportedLngs).map(([code, name]) => (
          <option value={code} key={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
