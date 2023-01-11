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

export const generateRandomString = (options: { length: number }) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < options.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
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

export const formatAmount = (amount: number, precision: number = 2) => {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  if (isNaN(amount)) {
    return '0.00';
  }

  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: precision
  };

  return new Intl.NumberFormat('en-US', options).format(amount);
};

export const formatNumber = (figure: number, precision?: number) => {
  if (typeof figure === 'string') {
    figure = parseFloat(figure);
  }

  if (isNaN(figure)) {
    return '0.00';
  }

  return new Intl.NumberFormat('en-US', precision ?  { minimumFractionDigits: precision } : {} ).format(figure);
};

export const parseAmount = (amount: string): string => {
  amount = amount.replace(/,/g, '').trim();
  return amount;
};

export const constructHyphenatedDateFormat = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export function constructSlashSeperatedDateFormat(date: Date): string {
  date = date instanceof Date ? date : new Date(date);
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return `${month}/${day}/${date.getFullYear()}`;
}

export const constructBillingDateFormat = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString('default', {
    month: 'short'
  });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export function addDaysToDate(date: Date, days: number) {
  date = new Date(date.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const convertFileSizeFromBytes = (size: number) => (
  unit: 'kb' | 'mb'
) => {
  if (unit === 'kb') {
    return (size / 1024).toFixed(2) + ' Kb';
  }

  return (size / 1024 / 1024).toFixed(2) + ' Mb';
};

export function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size >= 1048576) {
    return `${(size / 1048576).toFixed(2)} MB`;
  }
}

export const isValidFileType = (file: File, allowedTypes: string) => {
  if (!file) return false;
  const fileType = file.type;
  const allowed = allowedTypes
    .split(',')
    .map((fileType) => fileType.trim())
    .find((type) => fileType.includes(type));
  return allowed !== undefined;
};

export const isValidFileSize = (file: File, maxSize: number) => {
  if (!file) return false;
  return file.size! / 1024 / 1024 <= maxSize;
};

export const resolveErrorMessage = (error: boolean) => (message: string) => {
  if (error) {
    return message;
  }

  return undefined;
};

export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    return 'visibilitychange';
  } else if (typeof (document as any).msHidden !== 'undefined') {
    return 'msvisibilitychange';
  } else if (typeof (document as any).webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange';
  }
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  } else if (typeof (document as any).msHidden !== 'undefined') {
    return 'msHidden';
  } else if (typeof (document as any).webkitHidden !== 'undefined') {
    return 'webkitHidden';
  } else {
    return 'hidden';
  }
}

export function getIsDocumentHidden() {
  return !(document as any)[getBrowserDocumentHiddenProp()];
}

export const sortListByIdAsc = (list: any[]): any[] => {
  const sortedList = list.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }

    if (a.id > b.id) {
      return 1;
    }

    return 0;
  });

  return sortedList;
};

function get_random(list: any[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export const roundToUpperPlaceValue = (figure: number) => (
  nearestPlace: number
) => {
  if (!figure || !nearestPlace) {
    return 0;
  }

  if (isNaN(figure) || isNaN(nearestPlace)) {
    return 0;
  }

  return Math.ceil(figure / nearestPlace) * nearestPlace;
};

export const getPlaceValue = (figure: number): number => {
  let place = 1;

  if (figure < 1) {
    place = 1;
  } else if (figure > 1 && figure < 10) {
    place = 1;
  } else if (figure > 10 && figure < 100) {
    place = 10;
  } else if (figure > 100 && figure < 1000) {
    place = 100;
  } else if (figure > 1000 && figure < 10000) {
    place = 1000;
  } else if (figure > 10000 && figure < 100000) {
    place = 10000;
  }

  return place;
};

const roundToCeiling = () => () => {};
