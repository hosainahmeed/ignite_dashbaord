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
export interface OrganizerRecord {
    key?: string | number;
    name: string;
    email: string;
    club_name: string,
    profile_image: string;
    location: string;
    contactNumber: string;
    active_event: number,
    rating: number,
    total_rating: number,
    isBlock: boolean;
    subscription_prchase_date: string;
    createdAt: string;
}