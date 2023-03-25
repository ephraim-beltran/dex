import { useState } from "react";
import { useEffect } from "react";


const fetchList = (url,query) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    
  useEffect(() => {
    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query}),
    })
    .then(res => {
        if (!res.ok) {
            throw Error('Data not received')
        }
        return res.json()
    })
    .then(data => {
        setData(data.data)
        setIsLoading(false)
        setError(null)
    })
    .catch(err => {
        setError(err.message)
        setIsLoading(false)
    })

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default fetchList;
