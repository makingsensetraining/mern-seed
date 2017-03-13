import { Router } from 'express';
import controller from './<%= name %>.controller';

var router = new Router();

router.get('/api/<%= pluralizedName %>', controller.findAll);
router.get('/api/<%= pluralizedName %>/:id', controller.findById);
router.post('/api/<%= pluralizedName %>', controller.create);
router.put('/api/<%= pluralizedName %>/:id', controller.update);
router.delete('/api/<%= pluralizedName %>/:id', controller.delete);

module.exports = router;
