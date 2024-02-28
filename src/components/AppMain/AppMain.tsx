import { Box } from "@mui/material";
import { ProductFilter } from "./components/ProductFilter";
import { ProductList } from "./components/ProductList";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

export const AppMain = () => {

  const [filters, setFilters] = useState<Record<string, any>>({});
  return (
    <Box>
      <ProductFilter onFilter={setFilters} />
      <Routes>
        <Route path="/" element={<Navigate to="/products/1" />} />
        <Route path="/products/:page" element={<ProductList filters={filters} />} />
      </Routes>
    </Box>
  );
};
