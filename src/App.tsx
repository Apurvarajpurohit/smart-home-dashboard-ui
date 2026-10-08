import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Overview } from "./pages/Overview";
import { Lighting } from "./pages/Lighting";
import { Climate } from "./pages/Climate";
import { Security } from "./pages/Security";
import { Automations } from "./pages/Automations";
import { Devices } from "./pages/Devices";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="lighting" element={<Lighting />} />
          <Route path="climate" element={<Climate />} />
          <Route path="security" element={<Security />} />
          <Route path="automations" element={<Automations />} />
          <Route path="devices" element={<Devices />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
