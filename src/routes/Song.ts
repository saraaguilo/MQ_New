import express from 'express';
import controller from '../controllers/Song';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.song.create), controller.createSong);
router.get('/:songId', controller.readSong);
router.get('/', controller.readAll);
router.put('/:songId', ValidateSchema(Schemas.song.update), controller.updateSong);
router.delete('/:songId', controller.deleteSong);

export = router;
