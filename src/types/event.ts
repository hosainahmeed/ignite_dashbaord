import type { FeedbackData } from "./feedback";
import type { OrganizerRecord } from "./User";

export type EventStatus = "registration-open" | "started-event" | "finished-event";


export interface IeventData {
    id: number;
    title: string;
    location: string;
    dateRange: string;
    ages: string;
    rating: number;
    reviewCount: number;
    sport: string;
    photoUrl: string;
    status: EventStatus;
    registrationDeadline: string;
    availableSlot: number;
    eventType: string;
    eventStart: string;
    category: string,
    price: number;
    organizer: OrganizerRecord;
    contactEmail: string;
    contactPhone: string;
    eventDetails: string,
    isMyFeedbackGiven: boolean,
    feedbackData?: FeedbackData | null
}

