import Profile from '../views/Profile';
import ProtectedPages from '../common/layouts/ProtectedPages';
import LoginRequired from '../common/routeGuards/LoginRequired';

const profile = () => null;

profile.View = Profile;
profile.Layout = ProtectedPages;
profile.RouteGuard = LoginRequired;

export default profile;
