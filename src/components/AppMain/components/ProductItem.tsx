import { Card, CardContent, Typography } from "@mui/material";
import { IProduct } from "../../../model/productData";
import { productItemCardBoxStyles } from "./componentsStyles";

export const ProductItem = ({ product }: { product: IProduct }) => {
  return (
    <Card sx={productItemCardBoxStyles}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {product.product}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          id: {product.id}
        </Typography>
        <Typography variant="body2">Цена: {product.price}</Typography>
        <Typography variant="body2">
          Бренд: {product.brand || "Не указан"}
        </Typography>
      </CardContent>
    </Card>
  );
};
