'use strict';

import {Router} from 'express';
import controller from './user.controller';

var router = new Router();

router.get('/api/users', controller.findAll);
router.get('/api/users/:id', controller.findById);

module.exports = router;
