import AccessControl from 'accesscontrol';
const ac = new AccessControl();

export const roles = (function () {
    ac.grant("user").readAny("product"); 
    ac.grant("admin").extend("user") // admin role inherits user role permissions
                     .createAny("product")
                     .updateAny("product")
                     .deleteAny("product");

    return ac;
})();