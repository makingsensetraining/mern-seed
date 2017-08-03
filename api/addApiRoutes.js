function AddApiRoutes(app) {
    app.use(require('./user/index.js'));
}
module.exports = function (app) {
    return new AddApiRoutes(app);
};