import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div style={{ marginBottom: 20, textAlign: "center" }}>
      <label style={{ fontWeight: 500, fontSize: 18 }}>
        {t("selectLanguage")}:{" "}
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          style={{
            fontSize: 16,
            padding: "3px 8px",
            borderRadius: 6,
            border: "1.5px solid #a5b4fc",
            background: "#f1f5fd",
            marginLeft: 5
          }}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </label>
    </div>
  );
}