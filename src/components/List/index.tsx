import React, { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useApi";
import { Product } from "../../types/api";
import "./style.scss";

const List = () => {
  const { products, isLoading, isError } = useProducts();
  const [data, setData] = useState<Product[]>(products);
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    const foundItems = products.filter((item: Product) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setData(keyword ? foundItems : products);
    setQuery(keyword);
  };

  useEffect(() => {
    !isLoading && setData(products);
  }, [isLoading, products]);

  if (isError) return <div>An error has occurred. {isError}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list">
      <input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
      />
      {data &&
        data.map((product) => (
          <div key={product.id} className="list-item">
            {product.title}
            {product.variants.map((variant) => (
              <div key={variant.title}>
                {variant.title} {variant.price}
              </div>
            ))}
            {product.images.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={product.title}
                className="list-item__image"
              />
            ))}
            {/* <div dangerouslySetInnerHTML={{ __html: product.body_html }} /> */}
          </div>
        ))}
    </div>
  );
};

export default List;
