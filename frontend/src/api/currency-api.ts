import Freecurrencyapi from "@everapi/freecurrencyapi-js";

const CURRENCY_API_KEY = "fca_live_IvTleYhbbu5eetIBESBI6H1hVMsD4USiD9F7ypQG";
const CURRENCY_API_URL = "https://api.freecurrencyapi.com/v1/";

export const currencyApi = new Freecurrencyapi(CURRENCY_API_KEY);
