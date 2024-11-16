export interface Lawyer {
  id: string;
  userId: string;
  avatar?: string;
  specialization: string;
  bio?: string;
  phoneNumber?: string;
  address?: string;
  experience?: string; // New property
  certificate?: string; // New property
  rating?: number; // New property
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

// Additional types based on your schema
export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  messageType: string;
  messageContent?: string;
  attachment?: string;
  sentAt: Date;
}

export interface Document {
  id: string;
  caseId: string;
  title: string;
  file: string;
  uploadedAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
  notificationType: string; // Use enums if available
  url?: string;
}

export interface CaseMembership {
  id: string;
  userId: string;
  caseId: string;
  role: string; // Use enums if available
  permissions: object; // Adjust as needed
}