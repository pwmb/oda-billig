const unitPrices = Array.from(document.querySelectorAll(".unit-price"));

let cheapestPrice = Number.MAX_SAFE_INTEGER;
let cheapestElem = undefined;
let MAX_ALLOWED_HIGHLIGHT_ITEMS = 5

unitPrices
  .map(e => ({ price: getPriceFor(e), e }))
  .filter(e => e.price !== undefined)
  .sort((a, b) => a.price - b.price)
  .forEach((e, i) => i + 1 <= MAX_ALLOWED_HIGHLIGHT_ITEMS ? highlightElement(e.e, i) : "")



function getPriceFor(e) {
  const unitPrice = e.innerText
  const perKgOrLOrPiece = unitPrice.match(/kr ([0-9,]*) per (kg|l|piece|stk|m)/);
  if (!perKgOrLOrPiece) {
    // something different --> send to backend server to improve
    // console.log(unitPrice, document.location)
    return undefined
  }
  try {
    const priceExtract = perKgOrLOrPiece[1];
    return parseFloat(priceExtract.replace(",", "."))
  } catch (error) {
    // failed to cast to float
    // console.error(`Failed to parse to float -> ${price}`)
  }
  return undefined
}


function highlightElement(e, i) {
  if (!e) {
    return
  }
  e.innerText = `[${i + 1}] ${e.innerText}`
  // e.style.backgroundColor = "#8EC5FC"
  e.style.backgroundImage = "radial-gradient( circle farthest-corner at 10% 20%,  rgba(62,133,238,1) 1.1%, rgba(227,137,240,1) 43.7%, rgba(243,193,124,1) 89.7% )"
  e.style.borderRadius = "500px"
  e.style.color = "#000000"
}