import mongoose from 'mongoose'

export default async function connectdb() {
  try {
    if (!process.env.URL_DB) {
      throw new Error('URL_DB is not defined in environment variables')
    }

    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to DB')
      return
    }

    await mongoose.connect(process.env.URL_DB)

    console.log('✅ Connected to DB')
  } catch (error) {
    console.error('❌ DB connection error:', error)
    process.exit(1)
  }
}
