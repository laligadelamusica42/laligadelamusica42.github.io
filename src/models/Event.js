import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    eventOrganizer: {
        type: String,
        required: true
    }
});

export default mongoose.model('Events', eventSchema);
