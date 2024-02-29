import { Box } from "@mui/material";
import { ProductFilter } from "./components/ProductFilter";
import { ProductList } from "./components/ProductList";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

export const AppMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/valantis-app") {
      navigate("products/1");
    }
  }, [location, navigate]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  return (
    <Box>
      <ProductFilter onFilter={setFilters} />
      <Routes>
        <Route path="/" element={<Navigate to="/products/1" />} />
        <Route
          path="/products/:page"
          element={<ProductList filters={filters} />}
        />
      </Routes>
    </Box>
  );
};
