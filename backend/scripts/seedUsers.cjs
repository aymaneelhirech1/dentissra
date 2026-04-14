const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: require('path').resolve(__dirname, '..', '.env') });

async function main() {
  const db = process.env.DATABASE_URL;
  if (!db) {
    console.error('DATABASE_URL is not set in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(db);
  console.log('Connected to DB for seeding');

  const usersToCreate = [
    { fullname: 'Admin Demo', email: 'admin@admin.com', password: 'admin1234567890', role: 'Admin' },
    { fullname: 'Dr Demo', email: 'doctor@dental.com', password: 'doctor123', role: 'Dentist', specialization: 'Dentisterie' },
    { fullname: 'Secr Demo', email: 'secretary@dental.com', password: 'secretary123', role: 'Receptionist' },
  ];

  const usersCollection = mongoose.connection.collection('users');
  const personnelCollection = mongoose.connection.collection('personnels');

  for (const u of usersToCreate) {
    const exist = await usersCollection.findOne({ email: u.email });
    if (exist) {
      console.log(`User exists: ${u.email}`);
      continue;
    }
    const hashed = await bcrypt.hash(u.password, 12);
    const newUserDoc = {
      fullname: u.fullname,
      email: u.email,
      password: hashed,
      role: u.role,
      avatar: '',
      cover: '',
      bio: 'Hello User!',
      specialization: u.specialization || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await usersCollection.insertOne(newUserDoc);
    console.log(`Created user: ${u.email}`);

    if (u.role === 'Dentist') {
      const personnelExist = await personnelCollection.findOne({ email: u.email });
      if (!personnelExist) {
        const personnel = {
          nom: 'Demo',
          prenom: 'Dr',
          cin: `CIN${Math.floor(Math.random() * 1000000)}`,
          dateNaissance: new Date('1980-01-01'),
          sexe: 'Homme',
          telephone: '0600000000',
          email: u.email,
          adresse: '',
          poste: 'Dentiste',
          specialite: u.specialization || 'Dentisterie',
          dateEmbauche: new Date(),
          salaire: 0,
          userId: result.insertedId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await personnelCollection.insertOne(personnel);
        console.log(`Created personnel for ${u.email}`);
      }
    }
  }

  console.log('Seeding finished');
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
