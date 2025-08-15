import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CarsPage from "./pages/CarsPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CarsPage />
    </QueryClientProvider>
  );
}
