import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        return res.json();
      })
      .then((rxData) => {
        setData(rxData);
      })
      .catch((err) => setError(err.message))
      .finally(setIsLoading(false));
    return () => {
      controller.abort();
    };
  }, []);
  return {data, isLoading, error}
};
export default useFetch;
