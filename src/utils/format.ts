type getFormattedFloatOptions = {
  showDecimal?: boolean;
  addPlus?: boolean;
}

/** getFormattedFloat
 * 1        --> "1,00"
 * 12       --> "12,00"
 * 123      --> "123,00"
 * 1234     --> "1.234,00"
 * 12345    --> "12.345.00"
 * 123456   --> "123.456.00"
 * 1234567  --> "1.234.567,00"
 * 12345.67 --> "12.345,67"
 * @param number
 * @param options
 * @returns string
 */
export function getFormattedFloat(number: number, options?: getFormattedFloatOptions) {
  const thousandsSeparator = ".";
  const decimalSeparator = ",";

  const decimal = number.toFixed(2).split(thousandsSeparator)[1];
  let integer = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  integer = integer.substring(0, integer.length - 3).split(decimalSeparator).join(thousandsSeparator) || '0';

  if (options?.addPlus && number >= 0) {
    integer = "+" + integer;
  }

  if (options?.showDecimal) {
    return [integer, decimal].filter(x => x).join(decimalSeparator);
  }

  return [integer, decimal].filter(x => x).join(decimalSeparator).replace(/.00$/, "");
}

export function getFormattedCurrency(number: number | null | undefined, options?: getFormattedFloatOptions) {
  if (number === null || number === undefined || number < 0) {
    return "";
  }

  let num = getFormattedFloat(number, {showDecimal: options?.showDecimal});

  if (options?.addPlus) {
    num += "+";
  }

  return "₺ " + num;
}
