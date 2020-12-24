import mongoose from 'mongoose';

export const connectToDb = () => {
    mongoose.connect('mongodb://localhost:27017/Test',
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

