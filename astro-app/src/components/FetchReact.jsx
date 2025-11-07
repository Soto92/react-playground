import React, { useEffect, useState } from "react";
import { withMinDelay } from "../utils/delay";

export default function FetchReact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const json = await withMinDelay(
          fetch("https://api.github.com/repos/withastro/astro").then((res) =>
            res.json()
          ),
          3000
        );

        setData(json);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      style={{ border: "1px solid #aaa", padding: "1rem", marginTop: "1rem" }}
    >
      <h2>React Client Fetch</h2>
      {data ? (
        <pre>{JSON.stringify(data.owner, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
