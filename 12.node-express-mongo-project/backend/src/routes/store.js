
import express from 'express';
import { KeyValue } from '../model/keyValue.js';

const keyValueRouter = express.Router()

keyValueRouter.post('/', async(req, res) => {
    const {key, value} = req.body;

    if(!key || !value) {
        return res.status(400).json({error: 'Both key and value are required'})
    }

    try {
        const existingKey = await KeyValue.findOne({key});
        
        if(existingKey) {
            return res.status(400).json({error: 'Key already exists'})
        }

        const keyValueItem = new KeyValue({key, value})
        await keyValueItem.save()

        return res.status(201).json({message: 'Key-value pair stored successfully'})
    } catch (error) {
        res.status(500).json({error: `Internal server error - ${error}`})
    }
})

keyValueRouter.get('/:key', async (req, res) => {
    const {key} = req.params;

    try {
        const keyValueItem = await KeyValue.findOne({key})

        if(!keyValueItem) {
            return res.status(404).json({error: 'Key not found'})
        }

        return res.status(200).json({key: keyValueItem.key, value: keyValueItem.value})
    } catch (error) {
        res.status(500).json({ error: `Internal server error - ${error}` });
    }
})

keyValueRouter.delete('/:key', async(req, res) => {
    const {key} = req.params;

    try {
        const keyValueItem = await KeyValue.findOneAndDelete({key});
        if(!keyValueItem) {
            return res.status(404).json({error: 'Key not found'});
        }
        return res.status(200).json({message: 'key-value pair deleted successfully'});
    } catch (error) {
        res.status(500).json({error: `Internal server error - ${error}`});
    }
});

keyValueRouter.put('/:key', async(req, res) => {
    const { key } = req.params;
    const {value} = req.body;

    if(!value) {
        return res.status(400).json({error: 'value is required'})
    }

    try {
        const keyValueItem = await KeyValue.findOneAndUpdate({key}, {value}, {new: true})
        if(!keyValueItem) {
            return res.status(404).json({error: 'Key not found'})
        }         
        return res.status(200).json({message: 'key-value updated', key: keyValueItem.key, value: keyValueItem.value})
    } catch (error) {
        res.status(500).json({error: `Internal server error - ${error}`})
    }
})

export default keyValueRouter;
