function convetNumberToPriceVND(priceNumber: number) {
  let output = "";

  //languagecode-countrycode:
  //languagecode: full list @ https://www.w3schools.com/tags/ref_language_codes.asp
  //countrycode: full list @ https://www.w3schools.com/tags/ref_country_codes.asp
  const locale = "vi-VN";

  //full currencylist at https://www.currency-iso.org/en/home/tables/table-a1.html
  const currency = "VND";

  const formatter = new Intl.NumberFormat(locale, {
    currency,
  });

  //formating data
  output = formatter.format(Math.round(priceNumber)).replace(/\./g, ",");

  return output + "₫"
}

export { convetNumberToPriceVND }