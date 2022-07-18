import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='container'>
    <div className="main-body">
        <div className='text-center'>
            <h1>404 - Not Found!</h1>
            <Link to="/">Go Home</Link>
        </div>
    </div>
  </div>
);

export default NotFound;