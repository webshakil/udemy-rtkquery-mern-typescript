import { useAllProductsQuery } from "../../../redux/api/productAPI";
import { Product } from "../../../types/types";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";
const Products = () => {
  const { data, isLoading, isError } = useAllProductsQuery("");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data || !data.products) {
    return <div>Error loading products</div>;
  }
  const products: Product[] = data.products;
  return (
    <div>
      <div className="container">
        <Heading title="Our Products" subtitle={"Explore Our Products"} />
        <ProductCard data={products} />
        
      </div>
    </div>
  );
};

export default Products;