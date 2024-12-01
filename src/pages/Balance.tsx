import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'deposit',
    amount: 500,
    date: '2024-03-15',
    description: 'Monthly Savings Deposit',
  },
  {
    id: 2,
    type: 'withdrawal',
    amount: 200,
    date: '2024-03-10',
    description: 'Medical Bill Payment',
  },
  {
    id: 3,
    type: 'pending',
    amount: 300,
    date: '2024-03-16',
    description: 'Pending Loan Application',
  },
];

export default function Balance() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Balance & History</h1>

      {/* Balance Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600">Available Balance</p>
            <p className="text-3xl font-bold text-blue-600">₹5,400</p>
          </div>
          <div>
            <p className="text-gray-600">Total Saved</p>
            <p className="text-3xl font-bold text-green-600">₹6,200</p>
          </div>
          <div>
            <p className="text-gray-600">Pending Transactions</p>
            <p className="text-3xl font-bold text-orange-600">₹300</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
          <DollarSign className="mr-2" />
          Apply for Funds
        </button>
        <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center">
          <ArrowUpRight className="mr-2" />
          Add Money
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Transaction History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                {transaction.type === 'deposit' && (
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <ArrowDownRight className="h-6 w-6 text-green-600" />
                  </div>
                )}
                {transaction.type === 'withdrawal' && (
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <ArrowUpRight className="h-6 w-6 text-red-600" />
                  </div>
                )}
                {transaction.type === 'pending' && (
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.type === 'deposit' ? 'text-green-600' :
                transaction.type === 'withdrawal' ? 'text-red-600' :
                'text-orange-600'
              }`}>
                {transaction.type === 'deposit' ? '+' : '-'} ${transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}