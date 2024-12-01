import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, FileText, Users, Activity, Upload, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

const monthlyData = [
  { month: 'Jan', savings: 400 },
  { month: 'Feb', savings: 600 },
  { month: 'Mar', savings: 800 },
  { month: 'Apr', savings: 1000 },
  { month: 'May', savings: 1200 },
  { month: 'Jun', savings: 1400 },
];

const recentTransactions = [
  {
    id: 1,
    type: 'deposit',
    amount: 500,
    date: '2024-03-15',
    description: 'Monthly Savings'
  },
  {
    id: 2,
    type: 'withdrawal',
    amount: 200,
    date: '2024-03-10',
    description: 'Emergency Bill'
  }
];

export default function Dashboard() {
  const { user, updateUser } = useAuthStore();
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const generateNewCard = async () => {
    if (!user?.id) return;

    const cardNumber = Array(4).fill(0).map(() => 
      Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    ).join(' ');

    const date = new Date();
    const year = (date.getFullYear() + 4).toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const cardExpiry = `${month}/${year}`;
    const cardCvv = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    await updateUser(user.id, {
      cardNumber,
      cardExpiry,
      cardCvv,
      cardStatus: 'active'
    });
  };

  const handleFreezeCard = async () => {
    if (!user?.id) return;
    const newStatus = isCardFrozen ? 'active' : 'frozen';
    await updateUser(user.id, { cardStatus: newStatus });
    setIsCardFrozen(!isCardFrozen);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user?.id) return;

    const newDocuments = [...(user.documents || [])];
    
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        newDocuments.push(base64String);
        await updateUser(user.id!, { documents: newDocuments });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Good Morning,</h1>
          <p className="text-gray-600">Welcome back, {user?.fullName || 'User'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <CreditCard />, label: 'Total Balance', value: `₹${user?.balance || 0}` },
            { icon: <Activity />, label: 'Monthly Savings', value: '₹800' },
            { icon: <FileText />, label: 'Pending Bills', value: '2' },
            { icon: <Users />, label: 'Credit Score', value: user?.creditScore || '750' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  {React.cloneElement(stat.icon, { className: 'w-6 h-6 text-primary' })}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Savings Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Savings Overview</h2>
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="savings" fill="#20B2AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Virtual Card */}
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Medical Card</h2>
              {!user?.cardNumber && (
                <button
                  onClick={generateNewCard}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Generate Card
                </button>
              )}
            </div>
            <div className="gradient-card rounded-2xl p-6 text-white mb-6">
              <div className="flex justify-between items-start mb-8">
                <CreditCard className="h-8 w-8" />
                <p className="text-lg">TrustMed</p>
              </div>
              <p className="text-2xl mb-4">
                {showCardDetails ? user?.cardNumber : '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm opacity-75">Card Holder</p>
                  <p>{user?.fullName?.toUpperCase() || 'YOUR NAME'}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Expires</p>
                  <p>{user?.cardExpiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setShowCardDetails(!showCardDetails)}
                className="w-full bg-primary text-white px-4 py-3 rounded-xl hover:bg-primary/90 transition"
              >
                {showCardDetails ? 'Hide Card Details' : 'View Card Details'}
              </button>
              <button 
                onClick={handleFreezeCard}
                className="w-full bg-gray-50 text-primary px-4 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                {isCardFrozen ? 'Unfreeze Card' : 'Freeze Card'}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Upload Bills Section */}
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold mb-6">Upload Medical Bills</h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*,.pdf"
              className="hidden"
            />
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your medical bills here, or</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <ArrowDownRight className={`h-5 w-5 ${
                          transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'} ₹{transaction.amount}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}