import express from 'express'
import NotesModel from './models.js'
import mongoose from 'mongoose';
import axios from 'axios';

const notebooksApiUrl = process.env.NOTEBOOKS_API_URL;
const notesRouter = express.Router();

//middlewares start
function validateId(req, res, next) {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'Id not found'})
    next()
}
//middlewares end

//Create a new notes: POST '/'
notesRouter.post('/', async (req, res) => {    
    try {
        const {title, content, notebookId} = req.body;
        let validateNotebookId = null;
        if(!notebookId) {
            console.info({
                message: 'Notebookid not provided. Stroring without notebook'
            })
        } else if(!mongoose.Types.ObjectId.isValid(notebookId)) {
            return res.status(404).json({error: 'Notebook Not found', notebookId})
        } else {
            try {
                await axios.get(`${notebooksApiUrl}/${notebookId}`)            
            } catch (error) {
                const jsonError = error.toJSON()
                if(jsonError.status === 404) {
                    return res.status(404).json({error: 'Notebook Not found', notebookId})
                } else {
                    console.error({
                        message: 'Error verifying notebookId!. Notebooks services not available. Storing note with id for later validation.',
                        notebookId,
                        error: error.message
                    })
                }
            } finally {
                validateNotebookId = notebookId;
            }
        }

        if(!title || !content) return res.status(400).json({error: 'title and content are required'})
        const resp = new NotesModel({title, content, notebookId: validateNotebookId})
        await resp.save();
        return res.status(201).json({message: 'Successfull notes creation', data: resp})
    } catch (error) {
        return res.status(500).json({error: 'Server error', error})
    }
})



//Retrieve all notes: GET '/'
notesRouter.get('/', async (req, res) => {
    try {
        const resp = await NotesModel.find({})
        return res.status(200).json({data: resp})
    } catch (error) {
        return res.status(500).json({error: 'Server error', error})
    }
})

//Retrieve a notes by id: GET '/:id'
notesRouter.get('/:id', validateId, async (req, res) => {    
    try {
        const resp = await NotesModel.findById(req.params.id)
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.status(200).json({data: resp})
    } catch (error) {
        return res.status(500).json({error: 'Server error', error})
    }
})

//Update a notes: PUT '/:id'
notesRouter.put('/:id', validateId, async (req, res) => {       
    try {       
        const {title, content} = req.body;        
        const resp = await NotesModel.findByIdAndUpdate(req.params.id, {title, content}, { new: true })
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.status(201).json({message: 'Successfull notes update', data: resp})
    } catch (error) {
        return res.status(500).json({error: 'Server error', error})
    }
})


//Delete a noteks by id: DELETE '/:id'
notesRouter.delete('/:id', validateId, async (req, res) => {
    try {
        const resp = await NotesModel.findByIdAndDelete(req.params.id);
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({error: 'Server error', error})
    }
})

export default notesRouter;