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
    skills: {
        type: String,
        maxlength: 380
    },
    eventId: {
        type: String,
        required: true
    },
});

const Assistant = mongoose.models.Assistant || mongoose.model('Assistant', userSchema);

export default Assistant;