import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    eventId: { type: String, required: true },   // <-- ADD THIS
    userName: { type: String, required: false },
    satisfiedLevel: { type: Number, required: true, min: 1, max: 5 },
    suggetedLevel: { type: Number, required: true, min: 1, max: 5 },
    foodLevel: { type: Number, required: true, min: 1, max: 5 },
    cleanLevel: { type: Number, required: true, min: 1, max: 5 },
    showLevel: { type: Number, required: true, min: 1, max: 5 },
    dis_recommendations: { type: String, required: false }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
