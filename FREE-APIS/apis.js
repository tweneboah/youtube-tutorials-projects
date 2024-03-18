// fetch("https://restcountries.com/v3.1/name/norway")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log("Error:", error));

// fetch("https://v2.jokeapi.dev/joke/Any")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log("Error:", error));
// fetch("https://api.thedogapi.com/v1/images/search?breed_id=1", {
//   headers: {
//     "x-api-key":
//       "live_FxFvP4xJGxcsKOmO132Tqp2zPFSYRxsDeZElAnPLvwfddgR6xLGi6GSvnbmxd5Hu",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log("Error:", error));
// fetch(
//   "https://api.openweathermap.org/data/2.5/weather?q=London&appid=094b545dde613af5667ba10639a224f8"
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log("Error:", error));

fetch(
  "https://api.nasa.gov/planetary/apod?api_key=0K8hv0eV9jaoERf6cKC3jT217r0xxbg8pZAaas7S"
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log("Error:", error));
