import { Link } from "react-router";

const App = () => {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link to="/carto-styling">Carto Styling Link!</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default App;
