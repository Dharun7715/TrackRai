import { useState } from "react";

export default function App() {
  const [trainNumber, setTrainNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function searchTrain(event) {
    event.preventDefault();
    setResult(null);

    if (!/^\d{5}$/.test(trainNumber)) {
      setResult({
        status: "invalid_request",
        message: "Please enter a valid 5-digit train number.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/trains/${trainNumber}/live`);
      const data = await response.json();
      setResult({ ...data, httpStatus: response.status });
    } catch {
      setResult({
        status: "connection_error",
        message: "Could not connect to TrackRail server. Make sure Flask is running.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <nav className="nav">
        <a className="brand" href="/">
          <span className="brand-mark">T</span>
          <span>track<span className="brand-light">rail</span></span>
        </a>
        <span className="nav-tag">INDIAN RAILWAYS · JOURNEY COMPANION</span>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="pulse" /> YOUR JOURNEY, IN FOCUS</div>
        <h1>Every journey<br /><em>starts with clarity.</em></h1>
        <p className="intro">Find your train. Follow its journey. Travel with more confidence.</p>

        <form className="search-card" onSubmit={searchTrain}>
          <label htmlFor="train-number">TRAIN NUMBER</label>
          <div className="search-row">
            <div className="input-wrap">
              <span className="train-icon" aria-hidden="true">▤</span>
              <input
                id="train-number"
                inputMode="numeric"
                maxLength="5"
                placeholder="Enter 5-digit train number"
                value={trainNumber}
                onChange={(event) => setTrainNumber(event.target.value.replace(/\D/g, ""))}
              />
            </div>
            <button disabled={loading} type="submit">
              {loading ? "Checking…" : "Track train"} <span>↗</span>
            </button>
          </div>
          <div className="search-foot">
            <span>⌁</span> Live status requires an authorized railway data provider.
          </div>
        </form>

        {result && (
          <div className={`result ${result.status === "ok" ? "success" : ""}`} role="status">
            <strong>{result.status === "ok" ? "Train information received" : "TrackRail update"}</strong>
            <p>{result.message || "Provider response received."}</p>
            {result.train_number && <small>Train number: {result.train_number}</small>}
          </div>
        )}
      </section>

      <section className="features">
        <div className="section-heading">
          <span>BUILT AROUND YOUR JOURNEY</span>
          <h2>Less uncertainty.<br />More informed travel.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature">
            <div className="feature-icon">◷</div>
            <h3>Running status</h3>
            <p>Understand a train’s progress and delays when live provider data is connected.</p>
          </article>
          <article className="feature">
            <div className="feature-icon">⌖</div>
            <h3>Journey map</h3>
            <p>Explore the route and stations with a clear, map-first experience.</p>
          </article>
          <article className="feature">
            <div className="feature-icon">◎</div>
            <h3>Useful updates</h3>
            <p>Keep important journey information close, with alerts planned for a later release.</p>
          </article>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">T</span>
          <span>track<span className="brand-light">rail</span></span>
        </a>
        <span>Train journeys, made clearer.</span>
        <span className="footer-note">Independent travel companion · Not affiliated with Indian Railways</span>
      </footer>
    </main>
  );
}
