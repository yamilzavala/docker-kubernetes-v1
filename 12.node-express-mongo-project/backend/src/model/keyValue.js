import mongoose from 'mongoose';

const keyValueSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true,
    },
})

export const KeyValue = mongoose.model('KeyValue', keyValueSchema)