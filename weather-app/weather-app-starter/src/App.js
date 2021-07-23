import weatherSVG from "./img/weather.svg";
//display icon https://openweathermap.org/img/wn/${icon}.png
function App() {
  return (
    <div>
      <section class="relative bg-gray-900  min-h-screen">
        <img
          class="w-56 lg:block lg:absolute top-0 left-0 pt-10"
          src={weatherSVG}
          alt="/"
        />

        <div class="relative container pt-12 px-4 mb-20 mx-auto text-center">
          <span class="text-blue-500 font-semibold">
            Built with react and redux
          </span>
          <h2 class="mt-8 mb-8 lg:mb-12 text-white text-4xl lg:text-6xl font-semibold">
            Weather App
          </h2>
          <p class="max-w-3xl mx-auto mb-8 lg:mb-12 text-white text-xl opacity-50">
            Find out the current weather situation around the world
          </p>
          {/* Input */}
          <input
            placeholder="Search City"
            class="relative z-10 inline-block w-full md:w-auto mb-2  px-3 py-2 mr-4  font-medium leading-normal bg-transparent border-2 rounded-lg text-green-400 "
          ></input>
          {/* Button */}
          <button
            type="button"
            className="inline-flex items-center px-3 pr-3 28 text-center py-3 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
        {/* Content goes here */}
        <div class="max-w-6xl px-4 mx-auto ">
          <div class="flex flex-wrap -mx-4 justify-center">
            <div class="w-full md:w-1/3 px-4">
              <div class="p-8 border border-blue-800 rounded-lg">
                <div class="flex justify-start  items-center">
                  <span class="flex items-center justify-center w-16 h-16 rounded-full border-2">
                    {/* weather logo */}
                    {/* <img
                        class="w-56 "
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt="/"
                      /> */}
                  </span>
                  <h1 class="text-gray-300 pl-5">
                    {/* {weather?.weather[0].main} */}
                  </h1>{" "}
                </div>
                <h1 class="text-gray-300 text-center text-4xl mb-10">
                  {/* {Math.ceil(Number(weather?.main.temp))}{" "} */}
                  <span class="text-yellow-500 text-4xl">°C</span>
                </h1>
                <h3 class="mb-6 text-xl text-white font-semibold">
                  {/* {weather?.name}, {weather?.sys?.country} */}
                </h3>
                <p class="mb-8 text-gray-300">
                  {/* The weather condition in {weather?.name},{" "}
                    {weather?.sys?.country} is described as :{" "}
                    {weather?.weather[0].description} with a temperature of{" "}
                    {Math.ceil(Number(weather?.main.temp))} °C and a humidity of{" "}
                    {weather?.main?.humidity} % */}
                </p>
                <a
                  class="ml-auto flex items-center justify-center w-20 h-20 rounded-full  hover:bg-blue-700 text-white"
                  href="#"
                >
                  <span class="flex items-center justify-center w-16 h-16 rounded-full border-2">
                    {/* weather logo */}
                    {/* <img
                        class="w-56 "
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                        alt="/"
                      /> */}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <div class="text-center bg-red-900">
        <p class="mb-4  text-gray-300">
          Developed by
          <span class="p-2 text-yellow-300">
            <a href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw">
              i-Novotek
            </a>
          </span>
        </p>
        <a
          class="inline-flex text-blue-400 hover:text-blue-500 font-bold"
          href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
        >
          <span className="mb-10">Watch the tutorial</span>
          <svg
            class="ml-4 w-4 h-5"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7383 1.47342L18.7383 10.9304L17.5562 10.9304L17.5562 2.89788L0.834948 19.625L0.00154682 18.7916L16.7228 2.06448L9.28125 2.06448L9.28125 0.882355L18.1472 0.882355C18.4737 0.882355 18.7383 1.14697 18.7383 1.47342Z"
              fill="#1F40FF"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
