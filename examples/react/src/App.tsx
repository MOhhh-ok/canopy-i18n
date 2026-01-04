import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "./useI18n";

export default function App() {
  const { messages } = useI18n();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "30px",
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 20px 0", fontSize: "2em" }}>
          {messages.title.render()}
        </h1>
        <LanguageSwitcher />
      </header>

      <main
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <p style={{ margin: "0 0 15px 0", fontSize: "1.1em" }}>
          {messages.welcome.render()}
        </p>
        <p style={{ margin: "0", color: "#666" }}>
          {messages.description.render()}
        </p>
      </main>

      <section style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "1.5em", marginBottom: "15px" }}>
          {messages.features.title.render()}
        </h2>
        <ul style={{ paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px" }}>{messages.features.typeSafe.render()}</li>
          <li style={{ marginBottom: "8px" }}>{messages.features.simple.render()}</li>
          <li style={{ marginBottom: "8px" }}>{messages.features.chainable.render()}</li>
        </ul>
      </section>

      <footer
        style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #ddd",
          textAlign: "center",
          color: "#888",
          fontSize: "0.9em",
        }}
      >
        {messages.footer.render()}
      </footer>
    </div>
  );
}
