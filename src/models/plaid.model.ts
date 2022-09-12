export interface LinkSuccessMetadata {
    status:          null;
    link_session_id: string;
    institution:     Institution;
    accounts:        Account[];
    account:         Account;
    account_id:      string;
    transfer_status: null;
    public_token:    string;
}

export interface Account {
    id:                  string;
    name:                string;
    mask:                string;
    type:                string;
    subtype:             string;
    verification_status: null;
    class_type:          null;
}

export interface Institution {
    name:           string;
    institution_id: string;
}

export interface Transaction {
    id:                      number;
    fullName:                string;
    address:                 string;
    paymentMethod:           string;
    paymentChannel:          string;
    paymentProcessor:        string;
    longitude:               number;
    latitude:                number;
    AccountId:               string;
    customerId:              number;
    transactionRefId:        string;
    currencyCode:            string;
    amount:                  number;
    merchantName:            string;
    processed:               boolean;
    financeCategoryDetailed: string;
    financeCategoryPrimary:  string;
    TransactionDate:         Date;
    createdDate:             Date;
    createdBy:               string;
    lastActivityDate:        Date;
    lastActivityBy:          string;
}