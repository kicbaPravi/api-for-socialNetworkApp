import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    }
}, { timestamps: true });
export default mongoose.model('Post', PostSchema);
//# sourceMappingURL=Post.js.map