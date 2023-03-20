import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Podcasts from './pages/Podcasts/Podcasts';
import Discussions from './pages/Discussions/Discussions';
import Discussion from './pages/Discussion/Discussion';
import Podcast from './pages/Podcast/Podcast';
import StepPreferences from './pages/Steps/StepPreferences/StepPreferences';
import Profile from './pages/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // call refresh endpoint
    const { loading } = useLoadingWithRefresh();

    return loading ? (
        <Loader message='Loading, please wait..' />
    ) : (
        <>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <GuestRoute path='/' exact>
                        <Home />
                    </GuestRoute>
                    <GuestRoute path='/authenticate'>
                        <Authenticate />
                    </GuestRoute>
                    <SemiProtectedRoute path='/activate'>
                        <Activate />
                    </SemiProtectedRoute>
                    <ProtectedRoute path='/rooms'>
                        <Rooms />
                    </ProtectedRoute>
                    <ProtectedRoute path='/podcasts'>
                        <Podcasts />
                    </ProtectedRoute>
                    <ProtectedRoute path='/discussions'>
                        <Discussions />
                    </ProtectedRoute>
                    <ProtectedRoute path='/room/:id'>
                        <Room />
                    </ProtectedRoute>
                    <ProtectedRoute path='/discussion/:id'>
                        <Discussion />
                    </ProtectedRoute>
                    <ProtectedRoute path='/podcast/:id'>
                        <Podcast />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/:id'>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute path='/test'>
                        <StepPreferences />
                    </ProtectedRoute>
                </Switch>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/rooms',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user.activated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/rooms',
                            state: { from: location },
                        }}
                    />
                );
            }}
        ></Route>
    );
};

const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user.activated ? (
                    <Redirect
                        to={{
                            pathname: '/activate',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

export default App;
