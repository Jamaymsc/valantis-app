import React from "react";
import { QueryClientProvider } from "react-query";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { AppMain } from "./components/AppMain/AppMain";
import { AppFooter } from "./components/AppFooter/AppFooter";
import { queryClient } from "./queryClient";
import { BrowserRouter} from "react-router-dom";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppHeader />
        <AppMain />
        <AppFooter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
