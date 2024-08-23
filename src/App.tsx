import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import type { RootState } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import themes from "./themes";

import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from './routes/index.ts';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ==============================|| APP ||============================== //
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000
    },
  },
});
const App = () => {
  const customization = useSelector((state: RootState) => state.custom);

  return (
    <QueryClientProvider client={queryClient}>

      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            theme={customization.mode}
          />
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default App;
