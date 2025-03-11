// import { Button } from "./components/ui/button";

import Hero from "./components/Hero";
// import Header from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
// import { Counter } from "./redux/Counter";

const App = () => {
  return (
    


    <div className="container mx-auto">
       <ToastContainer position="bottom-right" />
        <Navbar/>
        {/* <Counter/> */}
        <Hero/>

    </div>
   
  );
}

export default App;
