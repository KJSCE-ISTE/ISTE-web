  import { Routes, Route } from "react-router-dom";
  import Navbar from "./Navbar.jsx";
  import Iday from "./Iday.jsx";
  import Abhiyantriki from "./Abhiyantriki.jsx";
  import Prakalpa from "./Prakalpa.jsx";
  import Workshop from "./Workshop.jsx";
  import Webinar from "./Webinar.jsx";
  import DeepSeaFooter from "./footer.jsx";

  function App() {
    return (
      <div>
        <Navbar />   

        <Routes>
          <Route path="/" element={<Abhiyantriki />} />
          <Route path="/events/abhiyantriki" element={<Abhiyantriki />} />
          <Route path="/events/prakalpa" element={<Prakalpa />} />
          <Route path="/events/iday" element={<Iday />} />
          <Route path="/events/workshops" element={<Workshop />} />
          <Route path="/events/webinars" element={<Webinar />} />
        </Routes>

        
      </div>
    );
  }

  export default App;
