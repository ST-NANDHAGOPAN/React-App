import React from "react";
import Routing from "./component/Router/Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";

const queryClient = new QueryClient();
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div>
          <Routing />
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
