import { useState } from "react";
import { useEffect } from "react";


const fetchData = (url,query) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

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
        setLoading(false)
        setError(null)
    })
    .catch(err => {
        setError(err.message)
        setLoading(false)
    })

    return () => controller.abort();
  }, []);

  return { data, error, loading };
};

export default fetchData;
