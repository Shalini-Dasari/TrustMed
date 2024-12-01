import Dexie, { type Table } from 'dexie';

export interface User {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  creditScore: number;
  documents: string[];
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardStatus: 'active' | 'frozen';
  balance: number;
}

export interface Transaction {
  id?: number;
  userId: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  description: string;
}

export interface MedicalBill {
  id?: number;
  userId: number;
  imageUrl: string;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}

export class TrustMedDB extends Dexie {
  users!: Table<User>;
  transactions!: Table<Transaction>;
  medicalBills!: Table<MedicalBill>;

  constructor() {
    super('trustMedDB');
    this.version(1).stores({
      users: '++id, email',
      transactions: '++id, userId, type, date',
      medicalBills: '++id, userId, date, status'
    });
  }
}

export const db = new TrustMedDB();