import React from 'react';
import { HttpStatusCode } from '../models/http-status-codes';

const BASE_URL = process.env.REACT_APP_PLAID_API_URL;

const HEADERS = {
  'Content-Type': 'application/json'
};

export const resetUserPassword = () =>
  `${BASE_URL}employee/dashboard/password/new`;

export const fetchWallet = async (responseHandlerFn: Function) => {
  try {
    const response = await fetch(`${BASE_URL + 'wallet'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    if (response.status !== HttpStatusCode.Ok) {
      throw new Error(responseData.message);
    }
  } catch (error) {
    throw new Error(error as string);
  }
};
