function controller(req, res) {

    res.render("index", {pageTitle:"Index", message: "Hey!"});
}
module.exports = controller;

