const calculateBtn = document.getElementById("calculateBtn");
const numberInput = document.getElementById("number");
const percentInput = document.getElementById("percent");
const percentageResult = document.getElementById("percentageResult");
const finalResult = document.getElementById("finalResult");

function calculate() {
  const numValue = parseFloat(numberInput.value);
  const percentageValue = parseFloat(percentInput.value);
  //validation
  if (isNaN(numValue) || isNaN(percentageValue)) {
    alert("Please enter a valid numbers");
    return;
  }
  const result = (numValue * percentageValue) / 100;
  const final = numValue + result;
  //inject into the dom
  percentageResult.textContent = formatNumber(result);
  finalResult.textContent = formatNumber(final);
}

//format the currency
function formatNumber(amount) {
  return (
    "$" +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
calculateBtn.addEventListener("click", calculate);
