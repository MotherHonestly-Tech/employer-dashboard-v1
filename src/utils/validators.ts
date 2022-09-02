import { parseAmount } from "./utils";

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_|+=?;:'",.<>]).{8,}/;

export const email = (value: string) => {
  return EMAIL_PATTERN.test(value.trim());
};

export const password = (value: string) => {
  return PASSWORD_PATTERN.test(value);
};

export const matchingFields = (value: string) => (matchingValue: string) => {
  return value === matchingValue;
};

export const required = (value: string) => {
  return value !== undefined && value.trim().length !== 0;
};

export const min = (min: number) => (value: string) => {
  value = parseAmount(value);
  return +value >= min;
};

export const max = (max: number) => (value: string) => {
  value = parseAmount(value);
  return +value <= max;
};

export const minLength = (minLength: number) => (value: string) => {
  return value.length >= minLength;
};

export const maxLength = (maxLength: number) => (value: string) => {
  return value.length <= maxLength;
};

export const isNumber = (value: string) => {
  value = parseAmount(value);
  return !isNaN(+value);
};

