import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotebooksSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: null
        },
    },
    { timestamps: true}
)

const NotebookModel = mongoose.model('Notebook', NotebooksSchema)

export default NotebookModel;