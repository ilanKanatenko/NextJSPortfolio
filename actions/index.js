import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then(async (res) => {
    const result = await res.json();
    return res.status !== 200 ? Promise.reject(result) : result;
  });

export const useGetPosts = () => {
  const { data, error, ...rest } = useSWR("/api/v1/posts", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};

export const useGetPostById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/posts/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

// import { useEffect, useState } from "react";

// export const useGetData = (url) => {
//   const [data, setData] = useState();
//   const [error, setError] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getData() {
//       const res = await fetch(url);
//       const result = await res.json();
//       if (res.status !== 200) {
//         setError(result);
//       } else {
//         setData(result);
//       }
//       setLoading(false);
//     }
//     url && getData();
//   }, [url]);

//   return { data, error, loading };
// };
