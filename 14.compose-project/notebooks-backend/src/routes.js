import express from 'express'
import NotebookModel from './models.js'
import mongoose from 'mongoose';

const notebookRouter = express.Router();

// notebookRouter.get('/', (req, res) => {
//     res.json({message: 'Hi there, from notebooks!'})
// })

//Create a new notebooks: POST '/'
notebookRouter.post('/', async (req, res) => {
    
    try {
        const {name, description} = req.body;

        if(!name) return res.status(400).json({error: 'Name is required'})
        const notebook = new NotebookModel({name, description})
        await notebook.save();
        return res.status(201).json({message: 'Successfull notebooks creation', data: notebook})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})


//Retrieve all notebooks: GET '/'
notebookRouter.get('/', async (req, res) => {
    try {
        const resp = await NotebookModel.find({})
        return res.status(200).json({data: resp})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})

//Retrieve a notebooks by id: GET '/:id'
notebookRouter.get('/:id', async (req, res) => {    
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'Id not found'})
        const resp = await NotebookModel.findById(id)
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.status(200).json({data: resp})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})

//Update a notebooks: PUT '/:id'
notebookRouter.put('/:id', async (req, res) => {       
    try {
        const {id} = req.params;
        const {name, description} = req.body;
        if(!name || !description) return res.status(500).json({message: 'Name and Description are required'})
        const resp = await NotebookModel.findByIdAndUpdate(id, {name, description}, { new: true })
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.status(201).json({message: 'Successfull notebooks update', data: resp})
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})


//Delete a notebooks by id: DELETE '/:id'
notebookRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'Id not found'})
        const resp = await NotebookModel.findByIdAndDelete(id);
        if(!resp) return res.status(404).json({error: 'Id not found'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: 'Server error', error})
    }
})

export default notebookRouter;