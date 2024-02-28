import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useState, useRef } from "react";
import { useGetFields } from "../../../api/api";
import { Loading } from "./Loading";
import { useParams, useNavigate } from "react-router-dom";

interface ProductFilterProps {
  onFilter: (filters: Record<string, any>) => void;
}

export const ProductFilter = ({ onFilter }: ProductFilterProps) => {
  const navigate = useNavigate();
  const { page: pageParam } = useParams();
  const page = Number(pageParam);
  const itemsPerPage = 50;
  const { data: fields, isLoading } = useGetFields(
    (page - 1) * itemsPerPage,
    itemsPerPage
  );
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>(
    {}
  );
  const inputsRef = useRef<{ [field: string]: HTMLInputElement | null }>({});
  const fieldNames = {
    brand: "название брэнда",
    price: "цену на товар",
    product: "наименование товара",
  };

  const handleFilterChange = (field: string, value: any) => {
    if (field === "price") {
      value = Number(value);
    }
    setSelectedFilters({
      ...selectedFilters,
      [field]: value,
    });
  };

  const handleApplyFilters = () => {
    onFilter(selectedFilters);
     };

  const handleResetFilters = () => {
    setSelectedFilters({});
    onFilter({});
    for (const field in inputsRef.current) {
      const input = inputsRef.current[field];
      if (input) {
        input.value = "";
      }
    }
    navigate("/products/1")
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{ mt: "10px" }} maxWidth="md">
      <Grid container spacing={2}>
        {fields &&
          Object.keys(fields).map((field) => {
            const key = field as keyof typeof fieldNames;
            if (fieldNames[key]) {
              return (
                <Grid item xs={4} key={field}>
                  <TextField
                    label={`Введите ${fieldNames[key]}`}
                    variant="outlined"
                    fullWidth
                    inputRef={(el) => (inputsRef.current[field] = el)}
                    onChange={(e) => handleFilterChange(field, e.target.value)}
                  />
                </Grid>
              );
            }
            return null;
          })}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilters}
        >
          Применить фильтр
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResetFilters}
          style={{ marginLeft: "10px" }}
        >
          Сбросить фильтр
        </Button>
      </Box>
    </Container>
  );
};
