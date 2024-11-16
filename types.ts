// types.ts
export interface Lawyer {
    id: string;
    userId: string;
    avatar?: string;
    specialization: string;
    bio?: string;
    phoneNumber?: string;
    address?: string;
  }
  
  export interface Client {
    id: string;
    userId: string;
    phoneNumber?: string;
    address?: string;
    avatar?: string;
  }
  
  export interface Case {
    id: string;
    caseName: string;
    description?: string;
    icon?: string;
    status: string; // Use enums or specific types as needed
    priority: string;
    privacy: string;
    lawyerId?: string;
    clientId?: string;
  }
  
  export interface Invoice {
    id: string;
    lawyerId: string;
    amount: number; // Adjust based on your decimal requirements
    issueDate: Date;
    dueDate: Date;
    status: string;
    active: boolean;
    description?: string;
  }
  
  export interface Payment {
    id: string;
    invoiceId: string;
    amount: number; // Adjust based on your decimal requirements
    paymentDate: Date;
    paymentMethod: string;
    status: string;
  }