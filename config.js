const config = {
    port:5555,
    db:{
        host:"localhost",
        user:"root",
        password:"rootroot",
        database:"message_board",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    uploadPath: "uploads"
};

export default config;