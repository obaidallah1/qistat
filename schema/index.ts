import { z } from 'zod';

// Enum Schemas
export const GenderEnum = z.enum(['MALE', 'FEMALE']);
export const UserRoleEnum = z.enum(['CLIENT', 'LAWYER', 'ADMIN']);
export const CaseMembershipRoleEnum = z.enum(['STAFF', 'ADMIN', 'MEMBER']);
export const CaseRequestStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED']);
export const CaseStatusEnum = z.enum(['IN_PROGRESS', 'COMPLETED', 'ON_HOLD']);
export const CasePriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export const CasePrivacyEnum = z.enum(['PRIVATE', 'PUBLIC', 'INTERNAL']);
export const NotificationTypeEnum = z.enum(['MESSAGE', 'ALERT', 'REMINDER']);
export const CaseRequestSlotEnum = z.enum(['AVAILABLE', 'UNAVAILABLE', 'N_P']);

// Base Schemas
const DateTimeSchema = z.string(); // Assuming ISO 8601 format
const UuidSchema = z.string().uuid(); // UUID validation

// CUser Schema
export const CUserSchema = z.object({
  id: UuidSchema,
  ClerkId: z.string(),
  email: z.string().email(),
  username: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  phoneNumber: z.string().optional(),
  age: z.number().optional(),
  bio: z.string().optional(),
  gender: GenderEnum.default('MALE'),
  role: UserRoleEnum.default('CLIENT'),
  address: z.string().optional(),
  avatar: z.string().optional(),
  isActive: z.boolean().default(true),
  dateJoined: DateTimeSchema.default(new Date().toISOString()),
  lastLogin: DateTimeSchema.optional(),
  createdAt: DateTimeSchema.default(new Date().toISOString()),
  updatedAt: DateTimeSchema.default(new Date().toISOString()),
});

// Client Schema
export const ClientSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  user: CUserSchema,
  caseRequests: z.array(z.object({})), // Define based on CaseRequest schema
  cases: z.array(z.object({})), // Define based on Case schema
  documents: z.array(z.object({})), // Define based on Document schema
});

// Lawyer Schema
export const LawyerSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  specialization: z.string(),
  experience: z.string().optional(),
  certificates: z.array(z.object({})), // Define based on Certificate schema
  rating: z.number().optional(),
  user: CUserSchema,
  cases: z.array(z.object({})), // Define based on Case schema
  caseRequests: z.array(z.object({})), // Define based on CaseRequest schema
  invoices: z.array(z.object({})), // Define based on Invoice schema
  payments: z.array(z.object({})), // Define based on Payment schema
  caseMemberships: z.array(z.object({})), // Define based on CaseMembership schema
});

// Invoice Schema
export const InvoiceSchema = z.object({
  id: UuidSchema,
  lawyerId: UuidSchema,
  amount: z.number(),
  issueDate: DateTimeSchema,
  dueDate: DateTimeSchema,
  status: z.string(),
  active: z.boolean().default(false),
  description: z.string().optional(),
  createdAt: DateTimeSchema.default(new Date().toISOString()),
  updatedAt: DateTimeSchema.default(new Date().toISOString()),
  lawyer: LawyerSchema,
  payments: z.array(z.object({})), // Define based on Payment schema
});

// Payment Schema
export const PaymentSchema = z.object({
  id: UuidSchema,
  invoiceId: UuidSchema,
  amount: z.number(),
  paymentDate: DateTimeSchema,
  paymentMethod: z.string(),
  status: z.string(),
  invoice: InvoiceSchema,
  CUser: z.array(CUserSchema),
  Lawyer: z.array(LawyerSchema),
});

// Case Schema
export const CaseSchema = z.object({
  id: UuidSchema,
  caseName: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  status: CaseStatusEnum.default('IN_PROGRESS'),
  priority: CasePriorityEnum.default('MEDIUM'),
  privacy: CasePrivacyEnum.default('PRIVATE'),
  lawyerId: UuidSchema.optional(),
  clientId: UuidSchema.optional(),
  createdAt: DateTimeSchema.default(new Date().toISOString()),
  updatedAt: DateTimeSchema.default(new Date().toISOString()),
  lawyer: LawyerSchema.optional(),
  client: ClientSchema.optional(),
  caseRequests: z.array(z.object({})), // Define based on CaseRequest schema
  documents: z.array(z.object({})), // Define based on Document schema
  caseMemberships: z.array(z.object({})), // Define based on CaseMembership schema
  chatRooms: z.array(z.object({})), // Define based on ChatRoom schema
});

// Certificate Schema
export const CertificateSchema = z.object({
  id: UuidSchema,
  lawyerId: UuidSchema,
  title: z.string(),
  issuedBy: z.string(),
  issuedDate: DateTimeSchema,
  expirationDate: DateTimeSchema.optional(),
  documentUrl: z.string().optional(),
  lawyer: LawyerSchema,
});

// CaseRequest Schema
export const CaseRequestSchema = z.object({
  id: UuidSchema,
  clientId: UuidSchema,
  lawyerId: UuidSchema,
  requestDate: DateTimeSchema.default(new Date().toISOString()),
  status: CaseRequestStatusEnum.default('PENDING'),
  slot: CaseRequestSlotEnum.default('N_P'),
  pinned: z.boolean().default(false),
  createdAt: DateTimeSchema.default(new Date().toISOString()),
  updatedAt: DateTimeSchema.default(new Date().toISOString()),
  client: ClientSchema,
  lawyer: LawyerSchema,
  Case: z.array(z.object({})), // Define based on Case schema
});

// ChatRoom Schema
export const ChatRoomSchema = z.object({
  id: UuidSchema,
  caseId: UuidSchema,
  createdAt: DateTimeSchema.default(new Date().toISOString()),
  case: CaseSchema,
  messages: z.array(z.object({})), // Define based on Message schema
  CUser: z.array(CUserSchema),
});

// Message Schema
export const MessageSchema = z.object({
  id: UuidSchema,
  chatRoomId: UuidSchema,
  senderId: UuidSchema,
  messageType: z.string(),
  messageContent: z.string().optional(),
  attachment: z.string().optional(),
  sentAt: DateTimeSchema.default(new Date().toISOString()),
  chatRoom: ChatRoomSchema,
  sender: CUserSchema,
  statuses: z.array(z.object({})), // Define based on MessageStatus schema
  CUser: z.array(CUserSchema),
});

// MessageStatus Schema
export const MessageStatusSchema = z.object({
  id: UuidSchema,
  messageId: UuidSchema,
  userId: UuidSchema,
  isRead: z.boolean().default(false),
  readAt: DateTimeSchema.optional(),
  message: MessageSchema,
  user: CUserSchema,
});

// Document Schema
export const DocumentSchema = z.object({
  id: UuidSchema,
  caseId: UuidSchema,
  title: z.string(),
  file: z.string(),
  uploadedAt: DateTimeSchema.default(new Date().toISOString()),
  updatedAt: DateTimeSchema.default(new Date().toISOString()),
  case: CaseSchema,
  Client: z.array(ClientSchema),
});

// CaseMembership Schema
export const CaseMembershipSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  caseId: UuidSchema,
  role: CaseMembershipRoleEnum.default('STAFF'),
  permissions: z.object({}).default({}),
  user: CUserSchema,
  case: CaseSchema,
  Lawyer: z.array(LawyerSchema),
});

// Notification Schema
export const NotificationSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  message: z.string(),
  createdAt: DateTimeSchema.default(new Date().toISOString()),
  isRead: z.boolean().default(false),
  notificationType: NotificationTypeEnum.default('MESSAGE'),
  url: z.string().optional(),
  user: CUserSchema,
});