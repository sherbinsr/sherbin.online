import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import { SectionsProvider } from "./components/SectionsContext";

export default function Home() {
  return (
    <SectionsProvider>
      <Navbar />
      <Portfolio />
    </SectionsProvider>
  );
}
