import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'https://my-company-website-three.vercel.app' }));
app.use(express.json());

// 1. The perfect link with the clean, symbol-free password
const myDatabaseLink = "mongodb://rohinidigitalmarketingaagency_db_user:Rohini12345@ac-6ezweqc-shard-00-00.ywwirdg.mongodb.net:27017,ac-6ezweqc-shard-00-01.ywwirdg.mongodb.net:27017,ac-6ezweqc-shard-00-02.ywwirdg.mongodb.net:27017/?ssl=true&replicaSet=atlas-jxr6cy-shard-0&authSource=admin&appName=Rohiniwebsitecluster";

// 2. Connect keeping the family: 4 safety net
mongoose.connect(myDatabaseLink, {
  family: 4 
})
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// The route that receives data from your React site
// The route that receives data from your React site
app.post('/api/submit-form', async (req, res) => {
  console.log("\n🚨 ---> INCOMING DATA DETECTED! <--- 🚨");
  
  try {
    const { name, email, phone, message } = req.body;
    console.log("Here is what the frontend sent:", { name, email, phone, message });

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save(); 
    
    console.log("✅ Data successfully saved to MongoDB!");
    res.status(201).json({ message: 'Data saved to MongoDB successfully!' });
  } catch (error) {
    console.error('\n❌ MONGODB SAVE ERROR:', error.message); 
    res.status(500).json({ message: 'Failed to save data', error });
  }
});

// This is the code that actually turns the server ON to listen to React!
// This tells the server: "Use the port Render gives us, or use 5000 if we are testing locally."
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running live on port ${PORT}`);
});