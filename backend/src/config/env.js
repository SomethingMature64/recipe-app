import "dotenv/config"; //This needs to be in place lest the environment variables in .env cannot be read
//This is how you use environment variables in js
// If the .env port isn't available, we should use the other port 8001


export const ENV = {
    PORT: process.env.PORT || 5001, //This is a fallback, if we can't get the process then we're going to default to 5001
    DATABASE_URL: process.env.DATABASE_URL,
}; 
//This dictionary is a wrapper on the .env file, it allows us to add things such as the default value for PORT