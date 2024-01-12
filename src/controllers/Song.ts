import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Song from '../models/Song';

const createSong = (req: Request, res: Response, next: NextFunction) => {
    const { songName, categoryName, releaseyear, author } = req.body;

    const song = new Song({
        _id: new mongoose.Types.ObjectId(),
        songName,
        categoryName,
        releaseyear,
        author
    });

    return song
        .save()
        .then((song) => res.status(201).json(song))
        .catch((error) => res.status(500).json({ error }));
};

const readSong = (req: Request, res: Response, next: NextFunction) => {
    const songId = req.params.songId;

    return (
        Song.findById(songId)
            //.populate('createdEventsId', 'joinedEventsId', 'idCategories')
            .then((song) => (song ? res.status(200).json(song) : res.status(404).json({ message: 'not found' })))
            .catch((error) => res.status(500).json({ error }))
    );
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return (
        Song.find()
            //.populate('createdEventsId', 'joinedEventsId', 'idCategories')
            .then((songs) => res.status(200).json(songs))
            .catch((error) => res.status(500).json({ error }))
    );
};

const updateSong = (req: Request, res: Response, next: NextFunction) => {
    const songId = req.params.songId;

    return Song.findById(songId)
        .then((song) => {
            if (song) {
                song.set(req.body);

                return song
                    .save()
                    .then((song) => res.status(201).json(song))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteSong = (req: Request, res: Response, next: NextFunction) => {
    const songId = req.params.songId;

    return Song.findByIdAndDelete(songId)
        .then((song) => (song ? res.status(201).json({ song, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createSong, readSong, readAll, updateSong, deleteSong };
