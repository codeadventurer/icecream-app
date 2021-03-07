/**
 * @function formatCurrency
 * Format number as currency(Euro)
 *
 * @param {number} amount
 * @returns {string} number formatted as currency
 *
 * @example
 *  formatCurrency(0)
 *  // => 0.00 €
 *
 *  @example
 *  formatCurrency(1.5)
 *  // => 1.50 €
 */

function formatCurrency(amount) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount)
}

export { formatCurrency }
