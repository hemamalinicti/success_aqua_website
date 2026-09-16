import mongoose from 'mongoose';

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/success_aqua_green';

  try {
    console.log(`[MongoDB] Attempting connection to: ${uri}`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log(`[MongoDB] Connected successfully to MongoDB instance.`);
  } catch (error) {
    console.warn(`[MongoDB Notice] Primary MongoDB daemon not active on port 27017 (${error.message}).`);
    console.log(`[MongoDB] Initializing embedded MongoDB server...`);
    
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[MongoDB Memory Server] Connected successfully to embedded MongoDB instance at ${memoryUri}`);
    } catch (memErr) {
      console.error(`[MongoDB Error] Could not initialize embedded database: ${memErr.message}`);
    }
  }
};

export default connectDB;
