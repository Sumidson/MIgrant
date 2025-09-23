import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

declare global {
  var mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  }
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4, skip trying IPv6
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose.connection)
  }

  try {
    cached.conn = await cached.promise
    console.log('✅ Connected to MongoDB Atlas successfully')
  } catch (e) {
    cached.promise = null
    console.error('❌ MongoDB connection error:', e)
    throw e
  }

  return cached.conn
}

// User Schema Definition (same as before)
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  role: {
    type: String,
    enum: ['patient', 'admin', 'worker', 'healthcare_provider'],
    default: 'patient'
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  emergencyContact: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    relationship: { type: String, required: true }
  },
  workerId: {
    type: String,
    sparse: true,
    unique: true
  },
  employerInfo: {
    companyName: String,
    supervisorName: String,
    supervisorContact: String
  },
  medicalInfo: {
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    allergies: [String],
    chronicConditions: [String],
    currentMedications: [String]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  profilePicture: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      const { _id, __v, password, verificationToken, resetPasswordToken, resetPasswordExpires, ...rest } = ret
      // Suppress unused variable warnings for destructured properties that are intentionally removed
      void __v
      void password
      void verificationToken
      void resetPasswordToken
      void resetPasswordExpires
      return {
        id: _id,
        ...rest
      }
    }
  }
})

// Create indexes for better performance
userSchema.index({ email: 1 })
userSchema.index({ phoneNumber: 1 })
userSchema.index({ workerId: 1 })

export const User = mongoose.models.User || mongoose.model('User', userSchema)

// Health Record Schema
const healthRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recordType: {
    type: String,
    enum: ['vaccination', 'checkup', 'treatment', 'prescription', 'test_result'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  healthcareProvider: {
    name: { type: String, required: true },
    facility: { type: String, required: true },
    licenseNumber: String
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  attachments: [String],
  notes: String,
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export const HealthRecord = mongoose.models.HealthRecord || mongoose.model('HealthRecord', healthRecordSchema)
