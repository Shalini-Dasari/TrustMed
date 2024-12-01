import create from 'zustand';
import { db, type User } from '../lib/db';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'cardNumber' | 'cardExpiry' | 'cardCvv' | 'cardStatus' | 'balance' | 'documents'>) => Promise<boolean>;
  updateUser: (userId: number, updates: Partial<User>) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const user = await db.users.where('email').equals(email).first();
      if (user && user.password === password) {
        set({ user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  signup: async (userData) => {
    try {
      const exists = await db.users.where('email').equals(userData.email).first();
      if (exists) return false;

      const cardNumber = generateCardNumber();
      const cardExpiry = generateCardExpiry();
      const cardCvv = generateCVV();

      const id = await db.users.add({
        ...userData,
        cardNumber,
        cardExpiry,
        cardCvv,
        cardStatus: 'active',
        balance: 0,
        documents: []
      });

      const user = await db.users.get(id);
      if (user) {
        set({ user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  },

  updateUser: async (userId: number, updates: Partial<User>) => {
    try {
      await db.users.update(userId, updates);
      const updatedUser = await db.users.get(userId);
      if (updatedUser) {
        set({ user: updatedUser });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  }
}));

function generateCardNumber(): string {
  return Array(4).fill(0).map(() => 
    Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  ).join(' ');
}

function generateCardExpiry(): string {
  const date = new Date();
  const year = (date.getFullYear() + 4).toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${month}/${year}`;
}

function generateCVV(): string {
  return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}