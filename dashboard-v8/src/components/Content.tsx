"use client"
import { useEffect, useState } from "react";
import ChickenHealthStatus from "./chart/ChickenHealthStatus";

interface ContentProps {
  title?: string;
}

const getWeatherData = async () => {
  const response = await fetch('/api/dashboard/getTemplate');
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchOrderInfo = async () => {
  const response = await fetch('/api/dashboard/getOrderInfo');
  const data = await response.json();
  console.log(data);
  return data;
};

export function Content(props: ContentProps) {
  const [weather, setWeather] = useState<{temperature: number, humidity: number, description: string, icon: string} | null>(null);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData();
        setWeather(data);
      } catch (error) {
        console.error('獲取天氣數據時發生錯誤:', error);
      }
    };
    fetchWeatherData();
    setOrderInfo(fetchOrderInfo());
  }, []);

  const sampleFarms = [
    { id: 1, name: "分場1", health: 95, total:210 },
    { id: 2, name: "分場2", health: 75, total:210 },
    { id: 3, name: "分場3", health: 40, total:210 },
  ];
    

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100">
      <div className="my-6 flex w-full flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-full">
          <div className="relative w-full overflow-hidden bg-white shadow-lg">
            <a href="#" className="block h-full w-full">
              <div className="flex items-center justify-center space-x-4 px-4 py-6 w-full">
                <div className="flex items-center">
                  <span className="relative rounded-full bg-red-100 p-5">
                    <svg
                      width="40"
                      fill="currentColor"
                      height="40"
                      className="absolute left-1/2 top-1/2 h-5 -translate-x-1/2 -translate-y-1/2 text-red-500"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 10h-5V5c0-.55-.45-1-1-1s-1 .45-1 1v5H7c-.55 0-1 .45-1 1s.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5c.55 0 1-.45 1-1s-.45-1-1-1z"/>
                    </svg>
                  </span>
                  <p className="ml-2 border-b border-gray-200 text-sm font-semibold text-gray-700 w-30">
                    健康比例
                  </p>
                </div>
                <ChickenHealthStatus farms={sampleFarms} />
              </div>
            </a>
          </div>
        </div>
        <div className="flex w-full items-center space-x-4 md:w-1/2">
          <div className="w-full">
            <div className="relative w-full bg-white px-4 py-6 shadow-lg flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-2xl font-bold text-black">{weather?.temperature} °C</p>
                <p className="text-sm text-gray-400">氣溫</p>
              </div>
              <div className="flex flex-col items-center">
              <p className="text-2xl font-bold text-black">{weather?.humidity} %</p>
              <p className="text-sm text-gray-400">濕度</p>
              </div>
              <img src={weather?.icon} alt="weather icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center rounded-r-full rounded-bl-full rounded-tl-sm border border-gray-300 px-4 py-2 text-gray-400">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2 text-gray-400"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z" />
          </svg>
          日期選擇
          <svg
            width="20"
            height="20"
            className="ml-2 text-gray-400"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
          </svg>
        </button>
        <span className="text-sm text-gray-400">
          選擇日期
        </span>
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="w-full">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
            <p className="w-max border-b border-gray-200 text-sm font-semibold text-gray-700 hover:text-black hover:border-black">
              場域總覽
            </p>
            <div className="my-6 flex items-end space-x-2">
              <p className="text-5xl font-bold text-black hover:text-red-500 transition-colors duration-300">12</p>
              <span className="flex items-center text-xl font-bold text-red-500">
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="h-3 rotate-180"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                </svg>
                2%
              </span>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場1</p>
                <div className="flex items-end text-xs">
                  34
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    22%
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場2</p>
                <div className="flex items-end text-xs">
                  13
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 text-green-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    12%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-12 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場3</p>
                <div className="flex items-end text-xs">
                  45
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    41%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
            <p className="w-max border-b border-gray-200 text-sm font-semibold text-gray-700 hover:text-black hover:border-black">
              雞隻健康狀況
            </p>
            <div className="my-6 flex items-end space-x-2">
              <p className="text-5xl font-bold text-black hover:text-red-500 transition-colors duration-300">12</p>
              <span className="flex items-center text-xl font-bold text-red-500">
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="h-3 rotate-180"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                </svg>
                2%
              </span>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">健康</p>
                <div className="flex items-end text-xs">
                  34
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    22%
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">生病</p>
                <div className="flex items-end text-xs">
                  13
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 text-green-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    12%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-12 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">死亡</p>
                <div className="flex items-end text-xs">
                  45
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    41%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
            <p className="w-max border-b border-gray-200 text-sm font-semibold text-gray-700 hover:text-black hover:border-black">
              沙門氏菌總覽
            </p>
            <div className="my-6 flex items-end space-x-2">
              <p className="text-5xl font-bold text-black hover:text-red-500 transition-colors duration-300">12</p>
              <span className="flex items-center text-xl font-bold text-red-500">
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="h-3 rotate-180"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                </svg>
                2%
              </span>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場1</p>
                <div className="flex items-end text-xs">
                  34
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    22%
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場2</p>
                <div className="flex items-end text-xs">
                  13
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 text-green-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    12%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-12 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場3</p>
                <div className="flex items-end text-xs">
                  45
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    41%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
            <p className="w-max border-b border-gray-200 text-sm font-semibold text-gray-700 hover:text-black hover:border-black">
              球蟲病總覽
            </p>
            <div className="my-6 flex items-end space-x-2">
              <p className="text-5xl font-bold text-black hover:text-red-500 transition-colors duration-300">12</p>
              <span className="flex items-center text-xl font-bold text-red-500">
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="h-3 rotate-180"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                </svg>
                2%
              </span>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場1</p>
                <div className="flex items-end text-xs">
                  34
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    22%
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場2</p>
                <div className="flex items-end text-xs">
                  13
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 text-green-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    12%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-12 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場3</p>
                <div className="flex items-end text-xs">
                  45
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    41%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
            <p className="w-max border-b border-gray-200 text-sm font-semibold text-gray-700 hover:text-black hover:border-black">
              新城病總覽
            </p>
            <div className="my-6 flex items-end space-x-2">
              <p className="text-5xl font-bold text-black hover:text-red-500 transition-colors duration-300">12</p>
              <span className="flex items-center text-xl font-bold text-red-500">
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="h-3 rotate-180"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                </svg>
                2%
              </span>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場1</p>
                <div className="flex items-end text-xs">
                  34
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    22%
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場2</p>
                <div className="flex items-end text-xs">
                  13
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 text-green-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    12%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-12 text-sm md:space-x-24 hover:bg-gray-50 hover:px-2 transition-all duration-200">
                <p className="hover:font-medium">分場3</p>
                <div className="flex items-end text-xs">
                  45
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    41%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg">
            <p className="w-max border-b border-gray-200 text-sm font-semibold text-gray-700">
              無
            </p>
            <div className="my-6 flex items-end space-x-2">
              <p className="text-5xl font-bold text-black">15</p>
              <span className="flex items-center text-xl font-bold text-green-500">
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="h-3"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                </svg>
                34%
              </span>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24">
                <p>Cloud</p>
                <div className="flex items-end text-xs">
                  123
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 rotate-180 text-red-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    22%
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between space-x-12 border-b border-gray-200 pb-2 text-sm md:space-x-24">
                <p>Infra</p>
                <div className="flex items-end text-xs">
                  134
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 text-green-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    9%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-12 text-sm md:space-x-24">
                <p>Office</p>
                <div className="flex items-end text-xs">
                  23
                  <span className="flex items-center">
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-3 text-green-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
                    </svg>
                    41%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
