const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const cors = require('cors')
app.use(cors());


// const cluserPassWord = 2YmEbpT3jCn1aoh9 ;
app.get('/',(req, res,) => {
  res.sendFile(__dirname + '/index.html');
})

// connecting to the server useing mongoose
const uri = "mongodb+srv://Jahid-Programming-center:2YmEbpT3jCn1aoh9@cluster0.aa0ccjg.mongodb.net/amarShopdb?retryWrites=true&w=majority";
// app.js (or wherever you set up your Express app)
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//  const dataBaseInsert = db.collection('product')
//   // inserting data to database
//   app.post('/addUser', (req, res) => {
//     const user = req.body;
//     dataBaseInsert.insertOne(user);
//     res.send('user add successfully')
//     console.log(user)
//   })
// })
async function connectToDatabase() {
  try {
     // Connect to MongoDB Atlas (replace 'your_connection_string' with your actual connection string)
     await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     });

     console.log('Connected to MongoDB Atlas');

     // Assuming you have a Product model defined, you can insert data like this:
     // const productSchema = new mongoose.Schema({ ... });
     // const Product = mongoose.model('Product', productSchema);

     // Or, if you want to insert directly without a model:
     // const dataBaseInsert = mongoose.connection.collection('product');

     app.post('/addUser', async (req, res) => {
        try {
           const user = req.body;
          const dataBaseInsert = db.collection('product') // Make sure the request body contains the user data
           dataBaseInsert.insertOne(user);
           // Assuming you have a Product model defined, you can insert data like this:
           // const newProduct = new Product(userData);
           // await newProduct.save();
           
           // Or, if you want to insert directly without a model:
           // await dataBaseInsert.insertOne(userData);

           res.send('User added successfully');
        } catch (error) {
           res.status(500).json({ error: error.message });
        }
     });
  } catch (error) {
     console.error('MongoDB connection error:', error.message);
  }
}

connectToDatabase();



app.listen(3000, ()=>{console.log('Server 3000 port is Running Successfully')});
