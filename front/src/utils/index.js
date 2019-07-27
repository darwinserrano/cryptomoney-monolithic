export const formatNumber = (value = 0, digits = 0) => {
  return parseFloat(parseFloat(value).toFixed(digits)).toLocaleString()
}