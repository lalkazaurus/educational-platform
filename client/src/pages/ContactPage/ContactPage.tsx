import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./ContactPage.module.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

export default function ContactPage() {
  const centerCoords: [number, number] = [50.244722, 28.637305];

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
            <Popup>We are here!</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <tr>
            <td>Email</td>
            <td>ipz_zyeyu@student.ztu.edu.ua</td>
          </tr>
          <tr>
            <td>Adress</td>
            <td>Chudnivska 103</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>+380688473823</td>
          </tr>
          <tr>
            <td>Hours</td>
            <td>9 a.m. – 5 p.m.</td>
          </tr>
          <tr>
            <td>Telegram</td>
            <td>@Lalkazaurus</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
