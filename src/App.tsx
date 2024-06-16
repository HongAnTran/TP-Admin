import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import type { RootState } from "./redux/store";
// routing

// import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
// defaultTheme
import themes from "./themes";

// project imports
// import NavigationScroll from './layout/NavigationScroll';
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
      staleTime:1000*20
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
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <CssBaseline />
        <RouterProvider router={router} />

      </ThemeProvider>
    </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default App;
