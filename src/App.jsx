import './App.css';
import Header from './Header';
import Section from './section';



function Intro() {
  return (
    <div className="intro">
      <div className="section-logo">
        <img src="/logo.png" alt="Council Logo" />
      </div>
      <div className="council-name" data-text="ISTE KJSSE">ISTE KJSSE</div>
    </div>
  );
}

// 🧱 Main App
function App() {
  return (
    <div className="App">
      <Header />
      <Intro />
      <Section />
    </div>
  );
}




export default App;