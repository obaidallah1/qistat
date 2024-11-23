import { CaseRequest,  ChatRoom, Gender, MessageStatus } from "@prisma/client";

export interface CUser {
  id: string; // @id @default(uuid()) @db.Uuid
  email: string; // @unique
  firstName?: string;
  lastName?: string;
  username: string;
  gender?:Gender;
  age?:number,
  role: UserRole; // @default(CLIENT)
  isActive?: boolean; // @default(true)
  dateJoined?: Date; // @default(now())
  lastLogin?: Date;
  createdAt?: Date; // @default(now())
  updatedAt?: Date; // @default(now()) @updatedAt

  client?: Client; // Relationship
  lawyer?: Lawyer; // Relationship
  caseMemberships?: CaseMembership[]; // Relationship
  notifications?: Notification[]; // Relationship
  messagesSent?: Message[]; // Relationship
  messageStatuses?: MessageStatus[]; // Relationship
  chatRooms?: ChatRoom[]; // Relationship
  paymentStatuses?: Payment[]; // Relationship
}

export interface LawyerWithUser {
  lawyer: Lawyer;
  user: CUser;
}
export interface Certificate {
  id: string; // UUID of the certificate
  lawyerId: string; // UUID of the associated lawyer
  title: string; // Title of the certificate
  issuedBy: string; // Issuing authority
  issuedDate: Date; // Date the certificate was issued
  expirationDate?: Date | null; // Optional expiration date
  documentUrl?: string | null; // Optional URL to the document
  lawyer: Lawyer; 


}


export interface Lawyer {
  id: string; // @id @default(uuid()) @db.Uuid
  userId: string; // @db.Uuid @unique
  avatar?: string;
  specialization: string;
  bio?: string; // @db.Text
  phoneNumber?: string;
  address?: string; // @db.Text
  experience?: string; // New property
  certificates?: Certificate[]; // New property
  rating?: number; // Average rating for the lawyer

  user: CUser; // Relationship
  cases?: Case[]; // Relationship
  caseRequests?: CaseRequest[]; // Relationship
  invoices?: Invoice[]; // Relationship
  payments?: Payment[]; // Relationship
  caseMemberships?: CaseMembership[]; // Relationship
}

export interface Client {
  id: string; // @id @default(uuid()) @db.Uuid
  userId: string; // @db.Uuid @unique
  phoneNumber?: string;
  address?: string; // @db.Text
  avatar?: string;

  user: CUser; // Relationship
  caseRequests?: CaseRequest[]; // Relationship
  cases?: Case[]; // Relationship
  documents?: Document[]; // Relationship
}

export interface Case {
  id: string; // @id @default(uuid()) @db.Uuid
  caseName: string; 
  description?: string; // @db.Text
  icon?: string;
  status: CaseStatus; // Updated to reflect schema type
  priority: CasePriority; // Updated to reflect schema type
  privacy: CasePrivacy; // Updated to reflect schema type
  lawyerId?: string; // @db.Uuid
  clientId?: string; // @db.Uuid
  createdAt?: Date; // @default(now())
  updatedAt?: Date; // @default(now()) @updatedAt

  lawyer?: Lawyer; // Relationship
  client?: Client; // Relationship
  caseRequests?: CaseRequest[]; // Relationship
  documents?: Document[]; // Relationship
  caseMemberships?: CaseMembership[]; // Relationship
  chatRooms?: ChatRoom[]; // Relationship
}

export interface Invoice {
  id: string; // @id @default(uuid()) @db.Uuid
  lawyerId: string; // @db.Uuid
  amount: number; // @db.Decimal(10, 2)
  issueDate: Date; // @db.Date
  dueDate: Date; // @db.Date
  status: string;
  active: boolean; // @default(false)
  description?: string; // @db.Text
  createdAt?: Date; // @default(now())
  updatedAt?: Date; // @default(now()) @updatedAt

  lawyer: Lawyer; // Relationship
  payments?: Payment[]; // Relationship
}

export interface Payment {
  id: string; // @id @default(uuid()) @db.Uuid
  invoiceId: string; // @db.Uuid
  amount: number; // @db.Decimal(10, 2)
  paymentDate: Date; // @db.Date
  paymentMethod: string;
  status: string;

  invoice: Invoice; // Relationship
  CUser?: CUser[]; // Relationship
  Lawyer?: Lawyer[]; // Relationship
}

export interface Message {
  id: string; // @id @default(uuid()) @db.Uuid
  chatRoomId: string; // @db.Uuid @unique
  senderId: string; // @db.Uuid @unique
  messageType: string;
  messageContent?: string; // @db.Text
  attachment?: string;
  sentAt: Date; // @default(now())

  chatRoom: ChatRoom; // Relationship
  sender: CUser; // Relationship
  statuses?: MessageStatus[]; // Relationship
  CUser?: CUser[]; // Relationship
}

export interface Document {
  id: string; // @id @default(uuid()) @db.Uuid
  caseId: string; // @db.Uuid
  title: string;
  file: string;
  uploadedAt: Date; // @default(now())
  updatedAt: Date; // @default(now()) @updatedAt

  case: Case; // Relationship
  Client?: Client[]; // Relationship
}

export interface Notification {
  id: string; // @id @default(uuid()) @db.Uuid
  userId: string; // @db.Uuid
  message: string; // @db.Text
  createdAt: Date; // @default(now())
  isRead: boolean; // @default(false)
  notificationType: NotificationType; // Updated to reflect schema type
  url?: string;

  user: CUser; // Relationship
}

export interface CaseMembership {
  id: string; // @id @default(uuid()) @db.Uuid
  userId: string; // @db.Uuid
  caseId: string; // @db.Uuid
  role: CaseMembershipRole; // Updated to reflect schema type
  permissions: object; // You may want to define a specific type here

  user: CUser; // Relationship
  case: Case; // Relationship
  Lawyer?: Lawyer[]; // Relationship
}

export enum UserRole {
  CLIENT = "CLIENT",
  LAWYER = "LAWYER",
  ADMIN = "ADMIN",
}

export enum CaseMembershipRole {
  STAFF = "STAFF",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum CaseStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
}

export enum CasePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum CasePrivacy {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
}

export enum NotificationType {
  MESSAGE = "MESSAGE",
  ALERT = "ALERT",
  REMINDER = "REMINDER",
}