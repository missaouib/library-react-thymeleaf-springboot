import React, { useEffect, refetch } from 'react'

export default function AuthHeader() {
    const user =  JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return {Authorization: 'Bearer ' + user.accessToken}; // for Spring boot back-end
        // return {'x-access-token': user.accessToken}; // fro Node.js Express back-end
    } else {
        return {};
    }
}
