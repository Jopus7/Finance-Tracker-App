
import freecurrencyapi

CURRENCY_API_KEY = "fca_live_IvTleYhbbu5eetIBESBI6H1hVMsD4USiD9F7ypQG";


client = freecurrencyapi.Client(CURRENCY_API_KEY)




def get_default_currencies():
   return client.currencies()
