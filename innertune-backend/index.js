import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoutes.js';
import albumRouter from './src/routes/albumRoutes.js';
import { Connection } from './src/database/db.js';
import { createUploadsFolder } from './security/helper.js'; 
import uploadRoutes from './src/routes/uploadRoutes.js';


// app config
const app = express();
const port = process.env.PORT || 4000;


// middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads")); // Serve static files from the "uploads" directory
createUploadsFolder();

// initializing routes
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/file", uploadRoutes)
app.get('/',(req,res)=>{
    res.send('API working');
})

Connection().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

