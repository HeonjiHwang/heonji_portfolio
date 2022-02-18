const proxy = require("http-proxy-middleware");

module.exports = function(app){
    app.upse(
        proxy("/api", {
            target:"http://localhost:4000/"
        })
    )
}