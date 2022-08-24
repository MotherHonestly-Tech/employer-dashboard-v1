export interface Category {
    id:               number;
    categoryName:     string;
    colorCode:        string;
    icon:             string;
}

export interface Merchant {
    id:               number;
    merchantName:     string;
    logoUrl:          string;
    address:          string;
    website:          string;
    amount:           number;
    merchantId:       number;
    categoryList:     Category[];
}