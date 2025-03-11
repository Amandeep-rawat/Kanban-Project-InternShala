// import { Button } from "./ui/button";

import HeroHeader from "./HeroHeader";
import HeroMain from "./HeroMain";
import RightSideBar from "./RightSideBar";

const Hero = () => {
  return (
    <div className=" p-3 w-full   mt-4 items-center gap-2 flex flex-col rounded-lg  ">
      <div className="w-full">

       <HeroHeader/>
       <div className="flex justify-center max-lg:text-xl max-sm:text-sm m-3 items-center font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-br from-[#5bff5b] to-[#bc11ab]">
        Drag and Drop Features are avaiable 🚀🚀
       </div>
       <HeroMain/>
      </div>
      <div className="w-full">
        <RightSideBar/>
      </div>
    </div>
  );
}

export default Hero;
