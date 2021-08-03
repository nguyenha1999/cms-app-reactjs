import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './../assets/libs/css/_base.css'
import "./App.scss";
import Layouts from './../layouts'
import GlobalLoading from './../components/GlobalLoading'

function App() {
    return (
        <Fragment>
            <Router>
                <Route component={Layouts} />
            </Router>
            <GlobalLoading />
        </Fragment>
    );
}
export default App;






























// import React, { useEffect, useState } from 'react'
// import productApi from '../api/Product/productApi';

// import '@helpers/String';

// export default function App() {
//     const [productList, setProductList] = useState([]);
//     useEffect(() => {
//         const fetchProductList = async () => {
//             try {
//                 const params = { _page: 1, _limit: 10 };
//                 const response = await productApi.getAll(params);
//                 console.log('Fetch products successfully: ', response);
//                 setProductList(response.data);
//             } catch (error) {
//                 console.log('Failed to fetch product list: ', error);
//             }
//         }
//         fetchProductList();
//     }, []);
//     return (
//         <p style={{textAlign: 'center', color: 'red'}}>OKE</p>
//     );
// }
