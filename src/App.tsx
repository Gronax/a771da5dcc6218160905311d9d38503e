import React, { useState, useEffect, useMemo } from "react";
// import { useProducts } from "./hooks/useApi";
import { Product } from "./types/api";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Search from "./components/Search";
import List from "./components/List";
import Pagination from "./components/Pagination";
import axios from "axios";

const App = () => {
  //const { products, isLoading, error } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;
  const pageNumbers = [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://teknasyon.netlify.app/.netlify/functions/products",
      headers: { "X-Access-Token": "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" },
    })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  for (let i = 1; i <= Math.ceil(totalProducts / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentItems = useMemo(() => {
    let computedProducts = products;

    if (searchTerm) {
      computedProducts = computedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTotalProducts(computedProducts.length);

    return computedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
  }, [products, currentPage, searchTerm]);

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;

  return (
    <>
      <Search
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
      <List currentItems={currentItems} />
      <Pagination
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        paginate={paginate}
      />
    </>
  );
};

export default App;
