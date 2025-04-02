import express from 'express'
import NotesModel from './models.js'
import mongoose from 'mongoose';

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
        const {title, content} = req.body;
        if(!title || !content) return res.status(400).json({error: 'title and content are required'})
        const resp = new NotesModel({title, content})
        await resp.save();
        return res.status(201).json({message: 'Successfull notes creation', data: resp})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})


//Retrieve all notes: GET '/'
notesRouter.get('/', async (req, res) => {
    try {
        const resp = await NotesModel.find({})
        return res.status(200).json({data: resp})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})

//Retrieve a notes by id: GET '/:id'
notesRouter.get('/:id', validateId, async (req, res) => {    
    try {
        const resp = await NotesModel.findById(req.params.id)
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.status(200).json({data: resp})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
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
        return res.status(500).json({message: 'Server error', error})
    }
})


//Delete a noteks by id: DELETE '/:id'
notesRouter.delete('/:id', validateId, async (req, res) => {
    try {
        const resp = await NotesModel.findByIdAndDelete(req.params.id);
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})

export default notesRouter;