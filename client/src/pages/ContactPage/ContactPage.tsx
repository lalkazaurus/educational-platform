import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./ContactPage.module.css";
import L from "leaflet";
import { useTranslation } from "react-i18next";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

export default function ContactPage() {
  const centerCoords: [number, number] = [50.244722, 28.637305];
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.mapWrapper}>
        <MapContainer
          center={centerCoords}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={centerCoords}>
            <Popup>{t("here")}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <tr>
            <td>{t("email_contact")}</td>
            <td>{import.meta.env.VITE_EMAIL}</td>
          </tr>
          <tr>
            <td>{t("address")}</td>
            <td>{import.meta.env.VITE_ADDRESS}</td>
          </tr>
          <tr>
            <td>{t("phone")}</td>
            <td>{import.meta.env.VITE_PHONE_NUMBER}</td>
          </tr>
          <tr>
            <td>{t("hours")}</td>
            <td>9 a.m. – 5 p.m.</td>
          </tr>
          <tr>
            <td>{t("telegram")}</td>
            <td>{import.meta.env.VITE_TELEGRAM}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
