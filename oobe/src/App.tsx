import Sidebar from "./components/Sidebar";
import "./App.css";
import EmbeddedApp from "./components/EmbeddedApp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="d-flex vh-100">
      <aside className="flex-shrink-0">
        <Sidebar />
      </aside>
      <section className="flex-grow-1 d-flex flex-column overflow-auto">
        <main className="flex-grow-1 p-3 bg-light">
          <Routes>
            <Route
              path="/hub"
              element={<EmbeddedApp url={"https://apphub.seco.com/"} />}
            />
          </Routes>
        </main>
      </section>
    </div>
  );
}

export default App;
