const amount = document.querySelector('[data-cls="amount"]');
const fromCurrency = document.querySelector('[data-cls="from-currency"]');
const fromFlag = document.querySelector('[data-cls="fromFlag"]');
const toFlag = document.querySelector('[data-cls="toFlag"]');
const toCurrency = document.querySelector('[data-cls="to-currency"]');
const swapButton = document.querySelector('[data-cls="swap-button"]');
const convertButton = document.querySelector('[data-cls="convert-button"]');
const resultBox = document.querySelector('[data-cls="result-box"]');
const result = document.querySelector('[data-cls="result"]');
const error = document.querySelector('[data-cls="error"]');
const errorMessage = document.querySelector('[data-cls="error-message"]');

Object.keys(COUNTRY_NAMES).forEach((element) => {
  fromCurrency.innerHTML += `<option value="${element}">${element} || ${COUNTRY_NAMES[element]}</option>`;
  toCurrency.innerHTML += `<option value="${element}">${element} || ${COUNTRY_NAMES[element]}</option>`;
});
fromCurrency.addEventListener("change", updateFromFlag);
toCurrency.addEventListener("change", updateToFlag);

convertButton.addEventListener("click", () => {
  amount.value = amount.value || 1;
  fetch(
    `https://v6.exchangerate-api.com/v6/38bbe80584f2da5ad1d7fe0e/latest/${fromCurrency.value}`,
  )
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Something went wrong with the request.");
      }

      return resp.json();
    })
    .then((data) => {
      const rate = data.conversion_rates[toCurrency.value];
      result.textContent = `${amount.value} ${fromCurrency.value} = ${calculated(amount.value, rate).toFixed(2)} ${toCurrency.value}`;
      resultBox.classList.remove("d-none");
    })
    .catch((err) => {
      errorMessage.textContent = err.message;
      error.classList.remove("d-none");
    });
});
swapButton.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateFromFlag();
  updateToFlag();
});

function calculated(amount, rate) {
  return amount * rate;
}
function updateFromFlag() {
  const countryCode = fromCurrency.value.slice(0, 2);
  fromFlag.src = `https://flagsapi.com/${countryCode}/shiny/32.png`;
}
function updateToFlag() {
  const countryCode = toCurrency.value.slice(0, 2);
  toFlag.src = `https://flagsapi.com/${countryCode}/shiny/32.png`;
}
