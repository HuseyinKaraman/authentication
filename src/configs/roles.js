const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("user").readAny("product"); 
    ac.grant("admin").extend("user") // admin role inherits user role permissions
                     .createAny("product")
                     .updateAny("product")
                     .deleteAny("product");

    return ac;
})();
