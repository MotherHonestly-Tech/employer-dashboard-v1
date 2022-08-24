import React from 'react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const resetUserPassword = () => `${BASE_URL}employee/dashboard/password/new`;
