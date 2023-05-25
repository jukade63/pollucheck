import React, { useCallback, useEffect, useState } from "react";
import Search from "./components/Search";
import toast, { Toaster } from "react-hot-toast";
import Display from "./components/Display";

const token = import.meta.env.VITE_WAQI_TOKEN;

function App() {
  const [aqiData, setAqiData] = useState({});
  const [search, setSearch] = useState("");

  const handleCLickSearch = (e) => {
    e.preventDefault();
    fetchApi();
  };

  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchApi = async () => {
    const url = search
      ? `https://api.waqi.info/feed/${search}/?token=${token}`
      : `https://api.waqi.info/feed/here/?token=${token}`;
    const res = await fetch(url);
    const { data } = await res.json();
    console.log(data);
    if (data === "Unknown station") {
      toast.error(`Search with city ${search} was not found`, {
        style: { background: "pink" },
      });
      return;
    }
    setAqiData(data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="bg-slate-100 pt-5">
      <Toaster />
      <Search onInputChange={onInputChange} handleSearch={handleCLickSearch} />
      {aqiData.forecast && <Display aqiData={aqiData} />}
    </div>
  );
}

export default App;
