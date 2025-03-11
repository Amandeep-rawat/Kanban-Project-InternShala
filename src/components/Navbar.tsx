import { Package2 } from "lucide-react";
// import { Input } from "@/components/ui/input";

import { ModeToggle } from "./ui/mode-toggle";
import SearchableDropdown from "./Board files/ComboBoxdemo";
// import { ComboboxDemo } from "./Board files/ComboBoxdemo";



export function Navbar() {
  return (
    <nav className="flex items-center justify-between  px-4 py-3 border-b">
      {/* Left Section - Logo & Site Name */}
      <div className="flex items-center gap-2">
        <Package2 className="h-6 w-6 text-primary" />
        <span className="text-xl max-sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5bff5b] to-[#bc11ab]">ProjectHub</span>
      </div>
    <div className="flex items-center md:gap-28  justify-center">

      {/* Middle Section - Search */}
      <div className="sm:flex-1  ">
       
        <SearchableDropdown/>
      </div>

      {/* Right Section - Add Project Button */}
      <div className="flex flex-col  items-center">
      <ModeToggle/>
      <p className="text-xs font-semibold text-red-500">Try Dark</p>
      
      </div>
      </div>

    </nav>
  );
}