import React from "react";
import * as CryptoJS from 'crypto-js';

export const isEmpty = (value: any) => {
  return value === undefined || value === null || value === '';
};

export const encrypt = (value: string): string => {
  return CryptoJS.AES.encrypt(
    value,
    process.env.REACT_APP_ENCRYPTION_KEY as string
  ).toString();
};

export const decrypt = (encryptedStr: string) => {
  return CryptoJS.AES.decrypt(
    encryptedStr,
    process.env.REACT_APP_ENCRYPTION_KEY as string
  ).toString(CryptoJS.enc.Utf8);
};

export const isHexColorBright = (color: string) => {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substring(0, 2), 16);
  const c_g = parseInt(hex.substring(2, 4), 16);
  const c_b = parseInt(hex.substring(4, 6), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
};

export const isValidDate = (date: Date | string) => {
  date = new Date(date);
  return (
    date instanceof Date && !isNaN(Date.parse((date as unknown) as string))
  );
};

export const getURLWithQueryParams = (
  base: string,
  params: Record<string, string>
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${base}?${query}`;
};

export const formatAmount = (amount: number) => {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  if (isNaN(amount)) {
    return '0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const constructDateFormat = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const convertFileSizeFromBytes = (size: number) => (
  unit: 'kb' | 'mb'
) => {
  if (unit === 'kb') {
    return (size / 1024).toFixed(2) + ' Kb';
  }

  return (size / 1024 / 1024).toFixed(2) + ' Mb';
};

export const resolveErrorMessage = (error: boolean) => (message: string) => {
  if (error) {
    return message;
  }

  return undefined;
};

export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    return "visibilitychange"
  } else if (typeof (document as any).msHidden !== "undefined") {
    return "msvisibilitychange"
  } else if (typeof (document as any).webkitHidden !== "undefined") {
    return "webkitvisibilitychange"
  }
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden"
  } else if (typeof (document as any).msHidden !== "undefined") {
    return "msHidden"
  } else if (typeof (document as any).webkitHidden !== "undefined") {
    return "webkitHidden"
  } else {
    return "hidden"
  }
}

export function getIsDocumentHidden() {
  return !(document as any)[getBrowserDocumentHiddenProp()]
}