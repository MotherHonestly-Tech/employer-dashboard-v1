export interface Organization {
    employer:       Employer;
    allocationList: AllocationList[];
}

export interface AllocationList {
    id:               number;
    allocationAmount: number;
    categoryName:     string;
    catReferenceId:   number;
    employerRefId:    number;
    EmployerId:       number;
    createdDate:      Date;
    createdBy:        string;
    lastActivityBy:   string;
    lastActivityDate: Date;
}

export interface Employer {
    id:                        number;
    logo:                      string;
    correspondentEmailAddress: string;
    CompanyName:               string;
    ein:                       string;
    businessType:              string;
    telephoneNumber:           string;
    employerRefId:             number;
    domain:                    string;
    numberOfEligibleEmployee:  number;
    fundPerEmployeePerQuarter: number;
    invoiceAmountPerQuarter:   number;
    monthlyAllocation:         number;
    quarterStart:              Date;
    quarterEnd:                Date;
    serviceCharge:             number;
    status:                    string;
    createdDate:               Date;
    createdBy:                 string;
    lastActivityBy:            string;
    lastActivityDate:          Date;
}
