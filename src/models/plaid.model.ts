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