import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import moment from "moment";
import React from "react";

function Display({
  aqiData: { aqi, iaqi: currentIndex, forecast, time, city },
}) {
  const pollutionLevel =
    aqi >= 301
      ? { label: "Harzadous", background: "bg-red-500" }
      : aqi >= 201
      ? { label: "Vary unhealthy", background: "bg-orange-500" }
      : aqi >= 151
      ? { label: "Unhealthy", background: "bg-violet-500" }
      : aqi >= 101
      ? { label: "High", background: "bg-amber-500" }
      : aqi >= 51
      ? { label: "Moderate", background: "bg-yellow-300" }
      : aqi >= 0
      ? { label: "Good", background: "bg-green-500" }
      : "No data";
  return (
    <div className="px-5">
      <div className="block mx-auto text-center max-w-fit">
        <p className="bg-slate-200 rounded-md mb-2 py-2 px-4">Air quality</p>
        <div
          className={`${pollutionLevel.background} py-2 px-4 rounded-md shadow font-semibold`}
        >
          {pollutionLevel.label} ({aqi})
        </div>
      </div>

      <p className="py-5">
        Air quality index ( AQI ) and other pollutant levels in {city.name}
      </p>
      <div className="flex flex-wrap gap-5 justify-center">
        {Object.keys(forecast.daily).map((name) => (
          <div key={name} className="bg-white shadow-md rounded-md">
            <div className="bg-teal-200 py-2 text-center">
              <p className="uppercase font-bold">{name}</p>
              <h2>
                Today :
                <span className="font-semibold ml-2">
                  {currentIndex[name]?.v} μg/m
                  <sup className="font-features sups">3</sup>
                </span>
              </h2>
            </div>
            <BarChart
              data={forecast.daily[name]}
              width={300}
              height={200}
              margin={{ right: 10, left: 10, top: 20, bottom: 10 }}
            >
              <Bar
                dataKey="min"
                fill="rgb(199 210 254)"
                opacity={0.7}
                stroke="rgb(55 65 81)"
                stackId="minmax"
                unit=" μg/m3"
              />
              <Bar
                dataKey="max"
                fill="rgb(252 165 165)"
                opacity={0.7}
                stroke="rgb(55 65 81)"
                stackId="minmax"
                unit=" μg/m3"
              />
              <XAxis
                dataKey="day"
                tickFormatter={(e) => moment(e).format("dd DD")}
                stroke="rgb(107 114 128)"
                fontSize={14}
                tickLine={false}
              />
              <YAxis
                orientation="left"
                tickLine={false}
                fontSize={14}
                width={35}
              />
              <Tooltip
                cursor={{ fill: "none", stroke: "rgb(55 65 81)" }}
                contentStyle={{
                  textAlign: "center",
                  border: "2px solid #ccc",
                }}
                labelStyle={{
                  color: "rgb(55 65 81)",
                }}
                labelFormatter={(e) => moment(e).format("DD MMMM YYYY")}
              />
            </BarChart>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Display);
