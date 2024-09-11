import { useSearchParams } from "react-router-dom";

interface Params {
  [key: string]: string | number;
}

const useSearchParamsHook = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to set a single search parameter
  const setParam = (key: string, value: string) => {
    if (typeof key === "string" && typeof value === "string") {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    }
  };

  // Function to get a single search parameter
  const getParam = (key: string): string | null => {
    if (typeof key === "string") {
      return searchParams.get(key);
    }
    return null;
  };

  // Function to set multiple search parameters
  const setParams = (params: Params) => {
    if (typeof params === "object" && !Array.isArray(params)) {
      Object.keys(params).forEach((key) => {
        if (
          typeof key === "string" &&
          (typeof params[key] === "string" || typeof params[key] === "number")
        ) {
          searchParams.set(key, params[key].toString());
        }
      });
      setSearchParams(searchParams);
    }
  };

  // Function to get all search parameters
  const getParams = (): Params => {
    const params: Params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  // Function to remove a single search parameter
  const removeParam = (key: string) => {
    if (typeof key === "string") {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  };

  // Function to remove multiple search parameters
  const removeParams = (keys: string[]) => {
    if (Array.isArray(keys) && keys.every((key) => typeof key === "string")) {
      keys.forEach((key) => searchParams.delete(key));
      setSearchParams(searchParams);
    }
  };

  // Function to clear all search parameters
  const clearParams = () => {
    const allParams = getParams();
    Object.keys(allParams).forEach((key) => searchParams.delete(key));
    setSearchParams(searchParams);
  };

  return {
    setParam,
    getParam,
    setParams,
    getParams,
    removeParam,
    removeParams,
    clearParams,
  };
};

export default useSearchParamsHook;
