import axios from "axios";
import useSWR from "swr";
import { IProduct } from "../types/api";

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { "X-Access-Token": "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" },
    })
    .then((res) => res.data);

export function useProducts() {
  const { data, error } = useSWR<IProduct>(
    "https://teknasyon.netlify.app/.netlify/functions/products",
    fetcher
  );

  return {
    products: (data && data.products) || [],
    isLoading: !error && !data,
    isError: error,
  };
}
