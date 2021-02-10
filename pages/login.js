/** import components */
import Login from '../views/Login';
import Authentication from '../common/layouts/Authentication';
// import UnAuthenticate from '../common/routeGuards/UnAuthenticate';

const login = () => null;

login.View = Login;
login.Layout = Authentication;
// login.RouteGuard = UnAuthenticate;

export default login;
