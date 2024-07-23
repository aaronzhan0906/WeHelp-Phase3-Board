import express, { application } from "express";
import mysql from "mysql2/promise";
import multer from "multer";
import path from "path";
import config from "../config.js";

const app = express();
const databasePool = mysql.createPool(config.db);

// file upload
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, config.uploadPath);
    },
    filename: (request, file, callback) => {
      const uniqueFileName = Date.now() + path.extname(file.originalname);
      callback(null, uniqueFileName);
    }
});
const fileUpload = multer({storage: fileStorage});

// middleware
app.use(express.json());
app.use(express.static("web"));
app.use(express.static("uploads"));

// Post //
app.post("/api/board", (request, response, next) => {    
    fileUpload.single("image")(request, response, function (error) {
        if (error instanceof multer.MulterError) {
            console.error("Multer error:", error);
            return res.status(400).json({ error: error.message });
        } else if (error) {
            console.error("Unknown error:", error);
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
        
        console.log("Uploaded file:", request.file);
        next();
    });
}, async (request, response) => {
    try {
        const message_board = request.body.content;
        let imageFilePath = null;
        console.log(imageFilePath)
        if (request.file) {
            imageFilePath = `/uploads/${request.file.filename}`;
        }
        
        const [queryResult] = await databasePool.query(
            "INSERT INTO messages (text, image_path) VALUES (?, ?)",
            [message_board, imageFilePath]
        );

        response.status(201).json({
            message: "Message posted successfully",
            id: queryResult.insertId
        });
    } catch(error){
        console.error("Error posting message:", error);
        response.status(500).json({message: "Error posting message"});
    }
});

// Get //
app.get("/api/board", async (request, response) => {
    try {
        const [messages] = await databasePool.query("SELECT * FROM messages ORDER BY created_at DESC");
        response.json(messages);
    } catch (error){
        console.error("Error fetching messages:", error);
        response.status(500).json({message: "ERROR fetching messages"});
    }
});

// start
app.listen(config.port, () => {
    console.log(`Server is now running on port ${config.port}`);
});