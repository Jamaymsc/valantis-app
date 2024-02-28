import { Box, Typography } from "@mui/material";
import { useFilter, useGetIds, useGetItems } from "../../../api/api";
import { IProduct } from "../../../model/productData";
import { ProductItem } from "./ProductItem";
import {
  linkButtonBoxStyles,
  linkButtonStyles,
  productListBoxStyles,
} from "./componentsStyles";
import { Link, useParams } from "react-router-dom";
import { Loading } from "./Loading";

interface ProductListProps {
  filters: Record<string, any>;
}

export const ProductList = ({ filters }: ProductListProps) => {
  const { page: pageParam } = useParams();
  const page = Number(pageParam);
  const itemsPerPage = 50;
  const extraItems = 10;
  const { data: allProductIds, isLoading } = useGetIds(
    (page - 1) * itemsPerPage,
    itemsPerPage + extraItems
  );

  const { data: filteredProductIds, isLoading: isFilteredIdsLoading } =
    useFilter(filters);
  const productIds = filteredProductIds || allProductIds;
  const { data: products, isLoading: isItemsLoading } = useGetItems(productIds);

  const uniqueProducts = new Map();
  if (products) {
    products.forEach((product: IProduct) => {
      if (!uniqueProducts.has(product.id)) {
        uniqueProducts.set(product.id, product);
      }
    });
  }
  const productList = Array
    .from(uniqueProducts
    .values())
    .slice(0,itemsPerPage);

  if (isLoading || isItemsLoading || isFilteredIdsLoading || !products) {
    return <Loading />;
  }

  return (
    <>
      <Box sx={productListBoxStyles}>
        {productList.length > 0 ? (
          productList.map((product: IProduct) => (
            <Box key={product.id}>
              <ProductItem product={product} />
            </Box>
          ))
        ) : (
          <Typography>По вашему запросу ничего не найдено.</Typography>
        )}
      </Box>
      <Box sx={linkButtonBoxStyles}>
        {page > 1 && (
          <Link style={linkButtonStyles} to={`/products/${page - 1}`}>
            Предыдущая страница
          </Link>
        )}
        {productList.length === itemsPerPage && (
          <Link style={linkButtonStyles} to={`/products/${page + 1}`}>
            Следующая страница
          </Link>
        )}
      </Box>
    </>
  );
};