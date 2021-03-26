import {createContext, useEffect, useState, ReactNode} from 'react'
import { api } from './services/api'

interface transactionProps{
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps{
  children: ReactNode;
}

export const TransactionsContext = createContext<transactionProps[]>([])

export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<transactionProps[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  return(
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}