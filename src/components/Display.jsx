import React, { Suspense } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Display({
  aqiData: { aqi, iaqi: currentIndex, forecast, time, city },
}) {
  const pollutionLevel =
    aqi >= 301
      ? { name: "Harzadous", background: "bg-red-500" }
      : aqi >= 201
      ? { name: "Vary unhealthy", background: "bg-orange-500" }
      : aqi >= 151
      ? { name: "Unhealthy", background: "bg-violet-500" }
      : aqi >= 101
      ? { name: "High", background: "bg-amber-500" }
      : aqi >= 51
      ? { name: "Moderate", background: "bg-yellow-300" }
      : aqi >= 0
      ? { name: "Good", background: "bg-green-500" }
      : "No data";
  return (
    <div className="px-5">
      <div className="block mx-auto text-center max-w-fit">
        <p className="bg-slate-200 rounded-md mb-2 py-2 px-4">Air quality</p>
        <div
          className={`${pollutionLevel.background} py-2 px-4 rounded-md shadow`}
        >
          {pollutionLevel.name}
        </div>
      </div>

      <div className="py-5">
        <p>
          Air quality index ( AQI ) and other pollutant levels in {city.name}
        </p>

        <p>Now:</p>
      </div>
      <div>
        {Object.keys(forecast.daily).map((keyName) => (
          <BarChart
            key={keyName}
            data={forecast.daily[keyName]}
            width={300}
            height={200}
          >
            <Tooltip />
            <XAxis dataKey="day" stroke="#8884d8" />
            <Bar dataKey="avg" fill="#475480" stroke="#242A40" />
          </BarChart>
        ))}
      </div>
    </div>
  );
}

export default Display;
