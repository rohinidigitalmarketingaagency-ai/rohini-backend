import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 1. We use the completely clean, bare link. NO username, NO password, NO @ symbols!
const myDatabaseLink = "mongodb://ac-6ezweqc-shard-00-00.ywwirdg.mongodb.net:27017,ac-6ezweqc-shard-00-01.ywwirdg.mongodb.net:27017,ac-6ezweqc-shard-00-02.ywwirdg.mongodb.net:27017/?ssl=true&replicaSet=atlas-jxr6cy-shard-0&authSource=admin&appName=Rohiniwebsitecluster";

// 2. We pass the credentials completely separately so Node doesn't try to read them as a web link
mongoose.connect(myDatabaseLink, {
  user: "rohinidigitalmarketingaagency_db_user",
  pass: "Rohini@12345",
  family: 4 
})
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// Blueprint for your contact form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// The route that receives data from your React site
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save(); 
    res.status(201).json({ message: 'Data saved to MongoDB successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save data', error });
  }
});

app.listen(5000, () => {
  console.log('Server is running live on http://localhost:5000');
});