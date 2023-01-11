export interface Category {
    id:               number;
    categoryName:     string;
    catReferenceId:   number;
    colorCode:        string;
    icon:             string;
    allocation:       number;
    value:            string;
    label:            string;
    expensePercent:   number;
}

export enum CategoryName {
    selfCare = 'Self Care',
    choiceFamily = 'Choice Family',
    childCare = 'Child Care',
    petCare = 'Pet Care',
    food = 'Food',
    houseHold = 'Household',
    others = 'Others',
    elderCare = 'Elder Care'
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

export interface Expense {
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

export interface CareWallet {
    customerId:                 number;
    walletBalance:              number;
    monthlyAllocation:          number;
    totalPayoutAmount:          number;
    totalFlaggedTrnx:           number;
    connectedAccount:           ConnectedAccount;
    numOfApprovedReembursement: number;
    expensePerCategory:         ExpensePerCategory;
}

export interface ConnectedAccount {
    accountId:    number;
    officailName: string;
    mask:         string;
}

export interface ExpensePerCategory {
    childCare:    number;
    selfCare:     number;
    petCare:      number;
    choiceFamily: number;
    food:         number;
    houseHold:    number;
    others:       number;
    elderCare:    number;
}