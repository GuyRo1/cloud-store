import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    originalName:{
        type:String
    },
    storageName:{
        type:String
    },
    bucket:{
        type:String
    },
    region:{
        type:String
    },
    key:{
        type:String
    }
})

const Image = mongoose.model('Image',ImageSchema)

export default Image 