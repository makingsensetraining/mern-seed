import <%= ucName %>Service from './<%= name %>.service';

class <%= ucName %>Controller {
  findAll(req, res, next) {
      <%= ucName %>Service.findAll((err, response) => {
      if (err) return next(err);

      res.status(200).json(response);
    });
  }

  findById(req, res, next) {
    const id = req.params.id;

    <%= ucName %>Service.findById(id, (err, response) => {
      if (err) return next(err);

      res.status(200).json(response);
    });
  }

  create(req, res, next) {
    <%= ucName %>Service.create(req.body.<%= name %>, (err, created<%= ucName %>) => {
      if (err) return next(err);

      res.status(200).json(created<%= ucName %>);
    });
  }

  update(req, res, next) {
    const id = req.params.id;
    const data = req.body.<%= name %>;

    <%= ucName %>Service.update(id, data, (err, updated<%= ucName %>) => {
      if (err) return next(err);

      res.status(200).json(updated<%= ucName %>);
    });
  }

  delete(req, res, next) {
    const id = req.params.id;

    <%= ucName %>Service.delete(id, (err, deleted<%= ucName %>Id) => {
      if (err) return next(err);

      res.status(200).end();
    });
  }
}

export default new <%= ucName %>Controller();
