import { RootState } from "@/redux/store";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppContext } from "@/context/AppContext";
import { Search } from "lucide-react"; // ✅ Icons for better UI
import { Button } from "../ui/button";

export default function SearchableDropdown() {
  const [query, setQuery] = useState("");
  const [isItemSelected, setIsItemSelected] = useState(false); // ✅ Track selection
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch tasks from Redux
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { setSearchQuery } = useAppContext();

  // ✅ Filtered tasks based on search query
  const filteredItems = query
    ? tasks.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setQuery("");
        setIsItemSelected(false); // ✅ Reset selection
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative  p-2" ref={dropdownRef}>
      {/* ✅ Input Field with Search Icon */}
      <div className="relative w-full flex gap-2">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsItemSelected(false); // ✅ Reset selection on typing
          }}
          className="w-full max-sm:w-[70%] border bg-white text-sm dark:bg-gray-800 dark:text-white p-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search tasks..."
        />

        {/* ✅ Clear All button - Show only when input has text or an item is selected */}
        {(query.length > 0 || isItemSelected) && (
          <Button
            variant={"ghost"}
            className="text-sm"
            size={"sm"}
            onClick={() => {
              setSearchQuery("");
              setQuery("");
              setIsItemSelected(false); // ✅ Reset selection
            }}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* ✅ Dropdown List */}
      {query && filteredItems.length > 0 && !isItemSelected && (
        <ul className="absolute left-0 w-full bg-white dark:bg-gray-800   border mt-2 rounded-md shadow-md max-h-40 overflow-y-auto z-10">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="p-3 cursor-pointer dark:hover:bg-gray-700  hover:bg-blue-100 transition"
              onClick={() => {
                setSearchQuery(item.id);
                setQuery(item.title); // ✅ Set input value instead of clearing
                setIsItemSelected(true); // ✅ Mark item as selected

                // ✅ Delay dropdown close so input gets updated first
                // setTimeout(() => setQuery(""), 200);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
