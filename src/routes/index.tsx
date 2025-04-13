import { Route, Routes, HashRouter } from "react-router";
import App from "../components";
import CartoStyling from "../components/cartoStyling";

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/carto-styling" element={<CartoStyling />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
