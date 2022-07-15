module.exports = {
  databaseName: process.env.DATABASE_NAME,
  databseUrl: process.env.MONGODB_URL,
  mongoURI: `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`,
  // mongoURI: "mongodb+srv://Vasyl:<2BPmXDS7z5>@cluster0.l6vdvtk.mongodb.net/?retryWrites=true&w=majority",

  port: process.env.PORT,
}

