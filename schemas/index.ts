import { z } from 'zod';

// Enums
const GenderSchema = z.enum(['MALE', 'FEMALE']);
const UserRoleSchema = z.enum(['CLIENT', 'LAWYER', 'ADMIN']);
const CaseMembershipRoleSchema = z.enum(['STAFF', 'ADMIN', 'MEMBER']);
const CaseRequestStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);
const CaseStatusSchema = z.enum(['IN_PROGRESS', 'COMPLETED', 'ON_HOLD']);
const CasePrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);
const CasePrivacySchema = z.enum(['PRIVATE', 'PUBLIC', 'INTERNAL']);
const NotificationTypeSchema = z.enum(['MESSAGE', 'ALERT', 'REMINDER']);
const CaseRequestSlotSchema = z.enum(['AVAILABLE', 'UNAVAILABLE', 'N_P']);

// CUser Schema
export const CUserSchema = z.object({
  id: z.string().uuid(),
  ClerkId: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  firstName: z.string().min(1),
  middleName: z.string().nullable(),
  lastName: z.string().min(1),
  phoneNumber: z.string().nullable(),
  age: z.number().nullable(),
  bio: z.string().nullable(),
  gender: GenderSchema.default('MALE'),
  role: UserRoleSchema.default('CLIENT'),
  address: z.string().nullable(),
  avatar: z.string().nullable(),
  isActive: z.boolean().default(true),
  dateJoined:z.date().default(() => new Date()),
  lastLogin: z.date().default(() => new Date()),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  client: z.object({}).optional(),
  lawyer: z.object({}).optional(),
  caseMemberships: z.array(z.object({})).optional(), 
  notifications: z.array(z.object({})).optional(), 
  messagesSent: z.array(z.object({})).optional(), 
  messageStatuses: z.array(z.object({})).optional(), 
  chatRooms: z.array(z.object({})).optional(), 
  paymentStatuses: z.array(z.object({})).optional(), 
  Message: z.array(z.object({})).optional(), 
});
export const MessageStatusSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  userId: z.string().uuid(),
  isRead: z.boolean().default(false),
  readAt: z.date().nullable(),
});
// Client Schema
export const ClientSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  user: CUserSchema, // Reference to the CUser schema
  caseRequests: z.array(z.object({})).optional(), 
  cases: z.array(z.object({})).optional(), 
  documents: z.array(z.object({})).optional(), 
});

// Lawyer Schema
export const LawyerSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  specialization: z.string().min(1),
  experience: z.string().nullable(),
  certificates: z.array(z.object({})).optional(), 
  rating: z.number().nullable(),
  user: CUserSchema,
  cases: z.array(z.object({})).optional(), 
  caseRequests: z.array(z.object({})).optional(), 
  invoices: z.array(z.object({})).optional(), 
  payments: z.array(z.object({})).optional(), 
  caseMemberships: z.array(z.object({})).optional(), 
});

// Invoice Schema
export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  lawyerId: z.string().uuid(),
  amount: z.number().positive(),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  status: z.string(),
  active: z.boolean().default(false),
  description: z.string().nullable(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  lawyer: LawyerSchema,
  payments: z.array(z.object({})).optional(), 
});

// Payment Schema
export const PaymentSchema = z.object({
  id: z.string().uuid(),
  invoiceId: z.string().uuid(),
  amount: z.number().positive(),
  paymentDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  paymentMethod: z.string().min(1),
  status: z.string(),
  invoice: InvoiceSchema,
  CUser: z.array(CUserSchema).optional(), 
  Lawyer: z.array(LawyerSchema).optional(), 
});

// Case Schema
export const CaseSchema = z.object({
  id: z.string().uuid(),
  caseName: z.string().min(1),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  status: CaseStatusSchema.default('IN_PROGRESS'),
  priority: CasePrioritySchema.default('MEDIUM'),
  privacy: CasePrivacySchema.default('PRIVATE'),
  lawyerId: z.string().uuid().nullable(),
  clientId: z.string().uuid().nullable(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  lawyer: LawyerSchema.optional(),
  client: ClientSchema.optional(),
  caseRequests: z.array(z.object({})).optional(), 
  documents: z.array(z.object({})).optional(), 
  caseMemberships: z.array(z.object({})).optional(), 
  chatRooms: z.array(z.object({})).optional(), 
});

// Define other schemas similarly...

// Example for CaseRequest Schema
export const CaseRequestSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  lawyerId: z.string().uuid(),
  requestDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  status: CaseRequestStatusSchema.default('PENDING'),
  slot: CaseRequestSlotSchema.default('N_P'),
  pinned: z.boolean().default(false),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  client: ClientSchema,
  lawyer: LawyerSchema,
  Case: z.array(z.object({})).optional(), 
});

// ChatRoom Schema
export const ChatRoomSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  case: CaseSchema, // Reference to Case schema
  messages: z.array(z.object({})).optional(), 
  CUser: z.array(CUserSchema).optional(), 
});

// Message Schema
export const MessageSchema = z.object({
  id: z.string().uuid(),
  chatRoomId: z.string().uuid(),
  senderId: z.string().uuid(),
  messageType: z.string().min(1),
  messageContent: z.string().nullable(),
  attachment: z.string().nullable(),
  sentAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  chatRoom: ChatRoomSchema, // Reference to ChatRoom schema
  sender: CUserSchema, // Reference to CUser schema
  statuses: z.array(z.object({})).optional(), 
  CUser: z.array(CUserSchema).optional(), 
});

// Document Schema
export const DocumentSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  title: z.string().min(1),
  file: z.string().min(1),
  uploadedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  case: CaseSchema, // Reference to Case schema
  Client: z.array(ClientSchema).optional(), 
});

// CaseMembership Schema
export const CaseMembershipSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  caseId: z.string().uuid(),
  role: CaseMembershipRoleSchema.default('STAFF'),
  permissions: z.any().default({}), // Assuming permissions is a JSON object
  user: CUserSchema, // Reference to CUser schema
  case: CaseSchema, // Reference to Case schema
  Lawyer: z.array(LawyerSchema).optional(), 
});

// Notification Schema
export const NotificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  message: z.string().min(1),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).default(() => new Date().toISOString()),
  isRead: z.boolean().default(false),
  notificationType: NotificationTypeSchema.default('MESSAGE'),
  url: z.string().nullable(),
  user: CUserSchema, // Reference to CUser schema
});

// Certificate Schema
export const CertificateSchema = z.object({
  id: z.string().uuid(),
  lawyerId: z.string().uuid(),
  title: z.string().min(1),
  issuedBy: z.string().min(1),
  issuedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  expirationDate:  z.string().nullable().refine((val) => val === null || !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  documentUrl: z.string().nullable(),
  lawyer: LawyerSchema, // Reference to Lawyer schema
});

// Additional schemas can go here...