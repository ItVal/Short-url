import mongoose from 'mongoose';
// import config from 'config';
import 'dotenv/config.js';
const db = process.env.mongoURI;

//connect db
export const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
		});

		console.log('MongoDB connected...');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

export default connectDB;
