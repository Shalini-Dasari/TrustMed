import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export default function AnimatedCard() {
  return (
    <motion.div
      initial={{ rotate: -5, y: 20 }}
      animate={{ rotate: 5, y: -20 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      className="glass-effect rounded-2xl p-8 transform hover:rotate-0 hover:y-0 transition-all duration-300"
    >
      <div className="gradient-card rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start mb-8">
          <CreditCard className="h-8 w-8" />
          <p className="text-lg">TrustMed</p>
        </div>
        <p className="text-2xl mb-4">•••• •••• •••• ••••</p>
        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-75">Card Holder</p>
            <p>YOUR NAME</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Expires</p>
            <p>MM/YY</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}