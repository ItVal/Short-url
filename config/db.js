import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongoURI');

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
