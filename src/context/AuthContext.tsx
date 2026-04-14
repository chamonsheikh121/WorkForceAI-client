import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'platform_owner' | 'company' | 'company_hr' | 'employee';
export type TenantType = 'platform' | 'company';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
  tenantName: string;
  tenantType: TenantType;
  avatar?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, roleId?: string) => boolean;
  logout: () => void;
  switchTenant: (tenantId: string) => void;
  getCurrentUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users with different roles
const demoUsers: Record<string, User & { password: string }> = {
  'platform_owner': {
    id: '1',
    email: 'admin@platform.com',
    name: 'Platform Admin',
    role: 'platform_owner',
    tenantId: 'platform',
    tenantName: 'WorkForceAI Platform',
    tenantType: 'platform',
    password: 'demo123',
    avatar: 'PA',
  },
  'company': {
    id: '2',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'company',
    tenantId: 'company',
    tenantName: 'Tech Solutions Inc',
    tenantType: 'company',
    password: 'demo123',
    avatar: 'AU',
  },
  'company_hr': {
    id: '4',
    email: 'hr@company.com',
    name: 'HR Manager',
    role: 'company_hr',
    tenantId: 'company',
    tenantName: 'Tech Solutions Inc',
    tenantType: 'company',
    password: 'demo123',
    avatar: 'HR',
  },
  'employee': {
    id: '3',
    email: 'employee@company.com',
    name: 'John Employee',
    role: 'employee',
    tenantId: 'company',
    tenantName: 'Tech Solutions Inc',
    tenantType: 'company',
    password: 'demo123',
    avatar: 'JE',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, roleId?: string) => {
    // Allow login with demo credentials for any role
    if (password !== 'demo123') {
      return false;
    }

    let selectedUser: User | null = null;

    if (roleId && demoUsers[roleId]) {
      selectedUser = { ...demoUsers[roleId] };
    } else {
      // Find user by email
      for (const userKey in demoUsers) {
        const u = demoUsers[userKey];
        if (u.email === email) {
          selectedUser = { ...u };
          break;
        }
      }
    }

    if (selectedUser) {
      setIsAuthenticated(true);
      setUser(selectedUser);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(selectedUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  const switchTenant = (tenantId: string) => {
    // In a real app, this would fetch data for the new tenant
    if (user) {
      const updatedUser = { ...user, tenantId };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const getCurrentUser = () => user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, switchTenant, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const getAvailableRoles = () => Object.keys(demoUsers).map(key => ({
  id: key,
  user: demoUsers[key],
}));
