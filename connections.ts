import mongoose from 'mongoose';
import { MONGO_DB_NAME, MONGO_LOCAL_CONN_URL } from './config';

export const connectToDb = () => {
    mongoose.connect(`${MONGO_LOCAL_CONN_URL}/${MONGO_DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (error) => {
            if (!error) {
                console.log('Successfully connected ot DB!!');
            } else {
                console.log('Error connecting to database');
            }
        }
    );
};

