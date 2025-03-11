import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provder.tsx'
import  {store, persistor } from './redux/store.ts'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppProvider } from './context/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>

    <PersistGate  persistor={persistor}>
    <AppProvider>


    <App />
      </AppProvider>
    </PersistGate>
    </Provider>
  </ThemeProvider>

)
