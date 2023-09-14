import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { categoriesAsync } from './redux';
import { router } from './routes';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoriesAsync.getAllCategory());
    }, [dispatch]);

    return <RouterProvider router={router} />;
}

export default App;
