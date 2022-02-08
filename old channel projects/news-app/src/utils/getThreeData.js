//function to get 4 data from array
//
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let result = arr.slice(0, 4)

const getFourData2 = (arr) => {
  let result = [];
  for (let i = 0; i < 4; i++) {
    result.push(arr[i]);
  }
  return result;
};

const getFourData = (arr) => {
  return arr.slice(0, 4);
};

export default getFourData;
