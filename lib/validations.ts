import { z } from 'zod'

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const signupSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .trim(),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  phoneNumber: z.string()
    .regex(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits'),
  dateOfBirth: z.string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  role: z.enum(['patient', 'admin', 'worker', 'healthcare_provider']).default('patient'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().default('India')
  }),
  emergencyContact: z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    phoneNumber: z.string().regex(/^[0-9]{10,15}$/, 'Emergency contact phone number must be 10-15 digits'),
    relationship: z.string().min(1, 'Relationship is required')
  }),
  workerId: z.string().optional(),
  employerInfo: z.object({
    companyName: z.string().optional(),
    supervisorName: z.string().optional(),
    supervisorContact: z.string().optional()
  }).optional(),
  medicalInfo: z.object({
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    allergies: z.array(z.string()).default([]),
    chronicConditions: z.array(z.string()).default([]),
    currentMedications: z.array(z.string()).default([])
  }).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Health record validation schema
export const healthRecordSchema = z.object({
  recordType: z.enum(['vaccination', 'checkup', 'treatment', 'prescription', 'test_result']),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  healthcareProvider: z.object({
    name: z.string().min(1, 'Healthcare provider name is required'),
    facility: z.string().min(1, 'Healthcare facility is required'),
    licenseNumber: z.string().optional()
  }),
  details: z.object({}).passthrough(), // Allow any additional properties
  notes: z.string().optional(),
  attachments: z.array(z.string().url()).default([])
})

// User profile update schema
export const updateProfileSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  phoneNumber: z.string().regex(/^[0-9]{10,15}$/).optional(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().min(1),
    country: z.string().default('India')
  }).optional(),
  emergencyContact: z.object({
    name: z.string().min(1),
    phoneNumber: z.string().regex(/^[0-9]{10,15}$/),
    relationship: z.string().min(1)
  }).optional(),
  medicalInfo: z.object({
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    allergies: z.array(z.string()).default([]),
    chronicConditions: z.array(z.string()).default([]),
    currentMedications: z.array(z.string()).default([])
  }).optional()
})

// Export types for TypeScript
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type HealthRecordInput = z.infer<typeof healthRecordSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
