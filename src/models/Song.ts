import mongoose, { Document, Schema } from 'mongoose';

export interface ISong {
    songName: string;
    categoryName: string;
    releaseyear: Date;
    author: string;
}

export interface ISongModel extends ISong, Document {}

const SongSchema: Schema = new Schema(
    {
        songName: { type: String, required: true },
        categoryName: { type: String, required: true },

        releaseyear: { type: Date, required: false },
        author: { type: Schema.Types.ObjectId, required: false, ref: 'User' }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<ISongModel>('Song', SongSchema);
