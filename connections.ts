import mongoose from 'mongoose';
import { MONGO_CLUSTER_DB, MONGO_CLUSTER_HOST, MONGO_CLUSTER_PASSWORD, MONGO_CLUSTER_USERNAME, MONGO_DB_NAME, MONGO_LOCAL_CONN_URL } from './config';

const dbUrl = `mongodb+srv://${MONGO_CLUSTER_USERNAME}:${MONGO_CLUSTER_PASSWORD}@${MONGO_CLUSTER_HOST}/${MONGO_CLUSTER_DB}?retryWrites=true&w=majority`;
// const dbURl = `${MONGO_LOCAL_CONN_URL}/${MONGO_DB_NAME}`;

export const connectToDb = () => {
    mongoose.connect(dbUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (error) => {
            if (!error) {
                console.log('Successfully connected ot DB!!');
            } else {
                console.log(error, 'Error connecting to database');
            }
        }
    );
};

