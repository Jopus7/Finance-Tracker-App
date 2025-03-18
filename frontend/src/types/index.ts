export type Expense = {
    id: number
    name: string
    description: string
    amount: number
    date: string
    category_name: string
    currency: string
  }
  
  export type Currency = {
    symbol: string;
    name: string;
    code: string;
  }
  
  export type Category = {
    id: number,
    name: string
  }