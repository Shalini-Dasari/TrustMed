import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { 
  User, Upload, Building, Wallet, Calculator, 
  BriefcaseIcon, HomeIcon, CarIcon, BadgeIndianRupee,
  FileText, CreditCard, Landmark 
} from 'lucide-react';

interface EmploymentDetails {
  type: string;
  company: string;
  position: string;
  experience: string;
  monthlyIncome: string;
}

interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [employment, setEmployment] = useState<EmploymentDetails>({
    type: 'full-time',
    company: '',
    position: '',
    experience: '',
    monthlyIncome: ''
  });

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: '',
    ifscCode: '',
    bankName: ''
  });

  const [assets, setAssets] = useState({
    propertyValue: '',
    vehicleValue: '',
    goldValue: '',
    stocksValue: '',
    otherAssets: ''
  });

  const [documents, setDocuments] = useState<string[]>([]);
  const [loanEligibility, setLoanEligibility] = useState<number | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleEmploymentChange = (field: keyof EmploymentDetails, value: string) => {
    setEmployment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankDetailsChange = (field: keyof BankDetails, value: string) => {
    setBankDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAssetChange = (field: string, value: string) => {
    setAssets(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newDocuments = [...documents];
    
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        newDocuments.push(base64String);
        setDocuments(newDocuments);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const calculateLoanEligibility = () => {
    const monthlyIncome = Number(employment.monthlyIncome) || 0;
    const totalAssets = Object.values(assets).reduce((sum, value) => sum + (Number(value) || 0), 0);
    const creditScoreMultiplier = Number(user.creditScore) / 850;
    
    // Calculate maximum loan amount based on:
    // 1. Monthly income (48 months worth)
    // 2. Assets (70% of total value)
    // 3. Credit score impact
    const maxLoanFromIncome = monthlyIncome * 0.8;
    const maxLoanFromAssets = totalAssets * 30;
    const maxLoan = Math.min(maxLoanFromIncome, maxLoanFromAssets) * creditScoreMultiplier;
    
    setLoanEligibility(maxLoan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Complete your profile to check loan eligibility</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-6">
            <User className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={user.fullName}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
              <div className="text-2xl font-bold text-primary">{user.creditScore}</div>
              <p className="text-sm text-gray-500 mt-1">
                {user.creditScore >= 750 ? 'Excellent' : 
                 user.creditScore >= 650 ? 'Good' :
                 user.creditScore >= 550 ? 'Fair' : 'Poor'} credit score
              </p>
            </div>
          </div>
        </motion.div>

        {/* Employment Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-6">
            <BriefcaseIcon className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold">Employment Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
              <select
                value={employment.type}
                onChange={(e) => handleEmploymentChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business Owner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={employment.company}
                onChange={(e) => handleEmploymentChange('company', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                value={employment.position}
                onChange={(e) => handleEmploymentChange('position', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Enter your position"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience</label>
              <input
                type="text"
                value={employment.experience}
                onChange={(e) => handleEmploymentChange('experience', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Years of experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
              <div className="relative">
                <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={employment.monthlyIncome}
                  onChange={(e) => handleEmploymentChange('monthlyIncome', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="Enter monthly income"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bank Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-6">
            <Landmark className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold">Bank Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={bankDetails.bankName}
                onChange={(e) => handleBankDetailsChange('bankName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                type="text"
                value={bankDetails.accountNumber}
                onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
              <input
                type="text"
                value={bankDetails.ifscCode}
                onChange={(e) => handleBankDetailsChange('ifscCode', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Enter IFSC code"
              />
            </div>
          </div>
        </motion.div>

        {/* Asset Declaration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-6">
            <Building className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold">Asset Declaration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Value</label>
              <div className="relative">
                <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={assets.propertyValue}
                  onChange={(e) => handleAssetChange('propertyValue', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="Enter property value"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Value</label>
              <div className="relative">
                <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={assets.vehicleValue}
                  onChange={(e) => handleAssetChange('vehicleValue', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="Enter vehicle value"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gold Value</label>
              <div className="relative">
                <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={assets.goldValue}
                  onChange={(e) => handleAssetChange('goldValue', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="Enter gold value"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stocks/Mutual Funds</label>
              <div className="relative">
                <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={assets.stocksValue}
                  onChange={(e) => handleAssetChange('stocksValue', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="Enter stocks value"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Assets</label>
              <div className="relative">
                <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={assets.otherAssets}
                  onChange={(e) => handleAssetChange('otherAssets', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="Enter other assets value"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Document Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-md md:col-span-2"
        >
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold">Required Documents</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Document Checklist</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Identity Proof (Aadhar/PAN)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Address Proof
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Income Proof (Salary Slips/ITR)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Bank Statements (6 months)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Asset Documents
                </li>
              </ul>
            </div>

            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
                <p className="text-gray-600 mb-2">Upload your documents here</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition"
                >
                  Choose Files
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={doc}
                      alt={`Document ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                      <button className="text-white">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loan Eligibility Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-md md:col-span-2"
        >
          <div className="flex items-center gap-4 mb-6">
            <Calculator className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold">Loan Eligibility</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-4">Eligibility Factors</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Credit Score: {user.creditScore}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Monthly Income: ₹{employment.monthlyIncome || '0'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Total Assets: ₹{Object.values(assets).reduce((sum, value) => sum + (Number(value) || 0), 0)}
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={calculateLoanEligibility}
                className="w-full bg-primary text-white px-4 py-3 rounded-xl hover:bg-primary/90 transition mb-4"
              >
                Calculate Eligibility
              </button>

              {loanEligibility !== null && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">Maximum Loan Amount</p>
                  <p className="text-2xl font-bold text-primary">₹{loanEligibility.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on your credit score, income, and assets
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}