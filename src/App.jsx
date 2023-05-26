import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import toast, { Toaster } from "react-hot-toast";
import Display from "./components/Display";
import background from "./assets/background.jpg";

const waqi_token = import.meta.env.VITE_WAQI_TOKEN;
const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;

function App() {
  const [aqiData, setAqiData] = useState({});
  const [search, setSearch] = useState("");
  const [image, setImage] = useState("");

  const handleClickSearch = (e) => {
    e.preventDefault();
    if (search) {
      fetchApi();
      fetchCityImage();
    }
    setSearch("");
  };

  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchApi = async () => {
    const url = search
      ? `https://api.waqi.info/feed/${search}/?token=${waqi_token}`
      : `https://api.waqi.info/feed/here/?token=${waqi_token}`;
    try {
      const res = await fetch(url);
      const { data } = await res.json();
      // console.log(data);
      if (data === "Unknown station") {
        toast.error(`Search with city "${search}" was no data`, {
          style: { background: "#F2D2BD" },
        });
        return;
      }
      setAqiData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const randomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  const fetchCityImage = async () => {
    const url = `https://api.unsplash.com/search/photos?query=${search}&client_id=${unsplashKey}`;
    const res = await fetch(url);
    const { results } = await res.json();
    const randomImgURL = results[randomIndex(results)].urls.regular;
    setImage(randomImgURL);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="relative w-screen bg-black-rgba">
      <Toaster />
      <img
        className="absolute w-full h-96 object-cover -z-10"
        src={image || background}
        alt="background-image"
      />
      <h1 className="text-3xl text-white font-bold text-center mb-5 pt-5">
        Pollutants Checker
      </h1>
      <Search
        onInputChange={onInputChange}
        search={search}
        handleSearch={handleClickSearch}
      />
      {aqiData.forecast ? (
        <Display aqiData={aqiData} />
      ) : (
        <h1 className="h-screen text-white text-2xl text-bold text-center pt-10">
          No sufficient data to display
        </h1>
      )}
    </div>
  );
}

export default App;
