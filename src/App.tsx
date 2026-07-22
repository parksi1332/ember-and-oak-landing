import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Origins } from "./components/Origins";
import { Roast } from "./components/Roast";
import { DataImpact } from "./components/DataImpact";
import { Brew } from "./components/Brew";
import { Shop } from "./components/Shop";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Origins />
        <Roast />
        <DataImpact />
        <Brew />
        <Shop />
      </main>
      <Footer />
    </>
  );
}

export default App;
