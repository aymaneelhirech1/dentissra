import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital_system_db')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Define User schema
    const userSchema = new mongoose.Schema({
      fullname: String,
      email: String,
      password: String,
      role: String,
      bio: String,
      avatar: String,
      cover: String,
      specialization: String
    });
    
    const User = mongoose.model('User', userSchema);
    
    // Delete existing secretary if exists
    await User.deleteOne({ email: 'secretary@dental.com' });
    
    // Hash password
    const hashedPassword = await bcrypt.hash('secretary123', 12);
    
    // Create secretary
    await User.create({
      fullname: 'Sarah Secrétaire',
      email: 'secretary@dental.com',
      password: hashedPassword,
      role: 'Receptionist',
      bio: 'Secrétaire médicale',
      avatar: '',
      cover: '',
      specialization: ''
    });
    
    console.log('✅ Secretary account created successfully!');
    console.log('📧 Email: secretary@dental.com');
    console.log('🔑 Password: secretary123');
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
