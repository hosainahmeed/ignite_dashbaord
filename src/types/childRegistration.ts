export interface ChildRegistrationData {

    childFirstName: string;
    childLastName: string;
    childDateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    childSport: string;
    parentGuardianFirstName: string;
    parentGuardianLastName: string;
    parentGuardianEmail: string;
    parentGuardianStreetAddress: string;
    parentGuardianCityState: string;
    parentGuardianZipPostalCode: string;
    annualHouseholdIncome: string;
    showcaseVideosOrSocialMediaLink: string;
    childStory: string;
    showcasingOptIn: 'Yes' | 'No';
    placement: 'Not Placed' | 'Placed' | string;
    createdAt: string;
}