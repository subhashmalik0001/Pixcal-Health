import { create } from 'zustand';

interface HealthData {
  symptoms: string[];
  vitals: {
    bp: { systolic: number; diastolic: number };
    spO2: number;
    temperature: number;
    glucoseFasting: number;
  };
  triageLevel: 'green' | 'yellow' | 'red' | null;
  triageConfidence: number;
}

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: string;
  relation: string;
  healthStatus: 'green' | 'yellow' | 'red';
  lastCheck: string;
}

interface UserData {
  name: string;
  age: number;
  email: string;
  phone: string;
  language: string;
  healthData: HealthData;
  familyMembers: FamilyMember[];
  accessibility: {
    fontSize: number;
    highContrast: boolean;
    voiceNav: boolean;
  };
}

export const usePixcalStore = create<{
  user: UserData;
  setUser: (user: Partial<UserData>) => void;
  updateHealthData: (data: Partial<HealthData>) => void;
  addFamilyMember: (member: FamilyMember) => void;
  updateAccessibility: (settings: Partial<UserData['accessibility']>) => void;
}>((set) => ({
  user: {
    name: 'Priya Sharma',
    age: 32,
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    language: 'en',
    healthData: {
      symptoms: [],
      vitals: {
        bp: { systolic: 118, diastolic: 76 },
        spO2: 97,
        temperature: 98.4,
        glucoseFasting: 92,
      },
      triageLevel: null,
      triageConfidence: 0,
    },
    familyMembers: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        age: 58,
        gender: 'Male',
        relation: 'Father',
        healthStatus: 'yellow',
        lastCheck: '3 days ago',
      },
      {
        id: '2',
        name: 'Anjali Sharma',
        age: 30,
        gender: 'Female',
        relation: 'Sister',
        healthStatus: 'green',
        lastCheck: '1 week ago',
      },
      {
        id: '3',
        name: 'Arjun Sharma',
        age: 8,
        gender: 'Male',
        relation: 'Son',
        healthStatus: 'green',
        lastCheck: '2 days ago',
      },
    ],
    accessibility: {
      fontSize: 100,
      highContrast: false,
      voiceNav: false,
    },
  },
  setUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
  updateHealthData: (healthData) =>
    set((state) => ({
      user: {
        ...state.user,
        healthData: { ...state.user.healthData, ...healthData },
      },
    })),
  addFamilyMember: (member) =>
    set((state) => ({
      user: {
        ...state.user,
        familyMembers: [...state.user.familyMembers, member],
      },
    })),
  updateAccessibility: (settings) =>
    set((state) => ({
      user: {
        ...state.user,
        accessibility: { ...state.user.accessibility, ...settings },
      },
    })),
}));
