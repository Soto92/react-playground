# 📡 React Query Offline Cache POC

This is a proof of concept showing how to use **TanStack Query (React Query)** to:

- Fetch data with caching
- Persist the cache into **localStorage**
- Allow offline usage (show cached data when offline)
- Re-sync automatically when back online

---

## 🚀 Getting Started

### 1. Create project with Vite (React + JS)

```bash
npm create vite@latest react-query-offline -- --template react
cd react-query-offline
```

### 2. Install dependencies

```bash
npm install react react-dom axios
npm install @tanstack/react-query
npm install @tanstack/react-query-persist-client @tanstack/query-async-storage-persister
```

---

## 📂 Project Structure

```
src/
 ├─ App.jsx        # Example component with useQuery
 ├─ main.jsx       # QueryClient setup + persistence
 └─ index.html     # Entry point
```

---

## 📝 Code Overview

### `src/main.jsx`

Sets up **QueryClient** with **cache persistence** to localStorage:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient();

const localStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

---

### `src/App.jsx`

Fetches posts with caching. Works **offline** if data was already loaded:

```jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

function Posts() {
  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts {isFetching && "🔄"}</h2>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>📡 React Query Offline Demo</h1>
      <Posts />
    </div>
  );
}
```

---

## 🌐 How to Test Offline Support

1. Run the app:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:5173](http://localhost:5173) in your browser.
3. Wait for the posts to load.
4. Disconnect your internet connection (or set browser dev tools → Network → Offline).
5. Refresh the page → the posts are still available from **cache** 🎉

---

## 📌 Next Steps

- Add **mutations** with optimistic updates and offline sync.
- Persist data in **IndexedDB** instead of localStorage (better for larger data).
- Create a React Native version using `AsyncStorage`.

---

## 🔗 References

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Persistence Guide](https://tanstack.com/query/latest/docs/react/guides/persistQueryClient)
