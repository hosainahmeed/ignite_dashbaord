import type { SelectOption } from "../types/index.select";

export const eventSelectData: SelectOption[] = [
    {
        label: "All Events",
        value: "all"
    },
    {
        label: "Registration Open",
        value: "registrationOpen"
    },
    {
        label: "Event Started",
        value: "eventStarted"
    },
    {
        label: "Event Finished",
        value: "eventFinished"
    }
]

export const transactionSelectData: SelectOption[] = [
    {
        label: "All Transactions",
        value: "all"
    },
    {
        label: "Today",
        value: "today"
    },
    {
        label: "This Week",
        value: "thisWeek"
    },
    {
        label: "This Month",
        value: "thisMonth"
    },
    {
        label: "This Year",
        value: "thisYear"
    }
]