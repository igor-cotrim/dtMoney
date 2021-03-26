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

type transactionInput = Omit<transactionProps, 'id' | 'createdAt'>

interface TransactionsProviderProps{
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: transactionProps[];
  createTransaction: (transaction: transactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<transactionProps[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput:transactionInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })

    const {transaction} = response.data

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return(
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}