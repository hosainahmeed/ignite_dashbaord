export interface donationsRecord {
    key?: string | number;
    donor_name: string;
    email: string;
    fund_type: 'IGNITE Fund' | 'IGNITE a Child';
    amount: string;
    frequency: string;
    fee_covered: boolean;
    tier_selected: string,
    date: string;
    transaction_id: string;
    createdAt: string;
}

export interface ClubAddress {
    streetAddress: string | null
    city: string | null
    state: string | null
    zipCode: string | null
}

export interface ClubRecord {
    key?: string | number;
    club_name: string;
    sportOffered: string;
    website: string;
    joinFee: string;
    joinDate: string;
    status: string;
    email: string;
    quantity: string;
    club_website: string,
    clubAddress: ClubAddress[]
    primaryContactName: string;
    primaryContactEmail: string;
    primaryContactPhone: string;
    competitionLevels: string;
    createdAt: string;
}