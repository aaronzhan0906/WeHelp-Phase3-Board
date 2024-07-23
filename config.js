import dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT || 5555,
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "message_board",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    uploadPath: process.env.UPLOAD_PATH || "uploads",
    s3: {
        region: process.env.AWS_REGION || "us-west-2",
        bucket: process.env.AWS_BUCKET || "ct-s3-bucket-for-project",
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
};

export default config;