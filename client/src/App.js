// App.js
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Introduction from './Components/Introduction';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import FAQs from './Components/FAQs';
import FeaturedWorkouts from './Components/FeaturedWorkouts';
import Team from './Components/Team';
import Pricing from './Components/Pricing';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Introduction />
      <AboutUs />
      <ContactUs />
      <FAQs />
      <FeaturedWorkouts />
      <Team />
      <Pricing />
    </div>
  );
}

export default App;
