import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    intraname: {
        type: String,
        required: true
    },
    events: [{
        eventId: {
            type: String
        },
        eventName: {
            type: String
        },
        eventDate: {
            type: Date
        }
    }]
});

const User = mongoose.model('User', userSchema);

export default User || mongoose.models.User;