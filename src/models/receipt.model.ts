export interface Receipt {
    id:               number;
    status:           string;
    customerId:       number;
    amount:           number;
    workFlowId:       number;
    TransactionRefId: number;
    reciept:          string;
    receiptName:      string;
    merchantId:       number;
    merchantName:     string;
    logoUrl:          string;
    merchantAddress:  string;
    website:          string;
    categoryName:     string;
    categoryId:       number;
    description:      string;
    remarks:          string;
    createdDate:      Date;
    createdBy:        string;
    lastActivityDate: Date;
    lastActivityBy:   string;
}