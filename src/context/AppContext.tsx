import { createContext, useState, ReactNode, useContext } from "react";

// ✅ Step 1: Define Type for Context
interface AppContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

// ✅ Step 2: Create Context (Initial Value: `null` to ensure type safety)
export const AppContext = createContext<AppContextType | null>(null);

// ✅ Step 3: Create Context Provider Component
export function AppProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
const value={
  searchQuery,
  setSearchQuery
}
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ Step 4: Create Custom Hook to Use Context (Optional but Recommended)
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
