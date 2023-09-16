"use client";
import React, { useState } from "react";


import Input from "./component/Input";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      e.preventDefault()
      try {
        const response = await fetch(url)
        if(!response.ok){
          throw new Error()
        }
        const data = await response.json()
        setData(data)
        setLocation("")
        setError("")
      } catch (error){
        setError("City not found")
        setData({})
      }
    }
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        {/* input and logo */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
        <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Weather App.</h1>
        </div>
      </div>
    </div>
  )
}

export default Home