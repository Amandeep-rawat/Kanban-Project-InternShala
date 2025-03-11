import AddTaskDialog from "./AddTaskDialog";


const HeroHeader = () => {
  return (
    
         <div className="flex items-center px-3   justify-between">
            <div className="">
                <h2 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-br from-[#5bff5b] to-[#bc11ab]">Your Projects</h2>
            </div>
            <div>
                <AddTaskDialog/>
            </div>
       
    </div>
  );
}

export default HeroHeader;
