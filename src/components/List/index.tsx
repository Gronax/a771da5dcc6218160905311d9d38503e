import { useProducts } from "../../hooks/useApi";
import "./style.scss";

const List = () => {
  const { products, isLoading, isError } = useProducts();

  if (isError) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list">
      {products &&
        products.map((product) => <div key={product.id}>{product.id}</div>)}
    </div>
  );
};

export default List;
