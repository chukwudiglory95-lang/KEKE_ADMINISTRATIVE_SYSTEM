// Centralized constants so status colors / labels are defined once,
// instead of copy-pasted into every page that shows a badge.

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
};

export const MEMBER_STATUS_BADGE = {
  Active: "badge-green",
  Pending: "badge-yellow",
  Suspended: "badge-red",
};

export const FEE_STATUS_BADGE = {
  Paid: "badge-green",
  Owing: "badge-red",
};

export const KEKE_STATUS_BADGE = {
  Active: "badge-green",
  "In Service": "badge-blue",
  "Under Repair": "badge-yellow",
  Inactive: "badge-red",
};

export const PERMIT_STATUS_BADGE = {
  Valid: "badge-green",
  Expiring: "badge-yellow",
  Expired: "badge-red",
};

export const PAYMENT_STATUS_BADGE = {
  Completed: "badge-green",
  Pending: "badge-yellow",
  Failed: "badge-red",
};

export const COMPLAINT_STATUS_BADGE = {
  Open: "badge-red",
  "In Progress": "badge-yellow",
  Resolved: "badge-green",
};

// Payment types from the spec's Payment Management section
export const PAYMENT_TYPES = [
  "Registration Fee",
  "Monthly Dues",
  "Daily Levy",
  "Permit Payment",
  "Fine Payment",
  "Donation",
  "Special Levy",
];

export const NIGERIAN_STATES = [
  "Abuja (FCT)",
  "Lagos",
  "Kano",
  "Rivers",
  "Kaduna",
  "Oyo",
  "Plateau",
  "Delta",
  // ...extend with the rest as needed
];







// export const MEMBER_STATUS_BADGE = { Active: "badge-green", Pending: "badge-yellow", Suspended: "badge-red" };
// export const FEE_STATUS_BADGE = { Paid: "badge-green", Owing: "badge-red" };
// export const KEKE_STATUS_BADGE = { Active: "badge-green", "In Service": "badge-blue", "Under Repair": "badge-yellow", Inactive: "badge-red", Suspended: "badge-red" };
// export const PERMIT_STATUS_BADGE = { Valid: "badge-green", Expiring: "badge-yellow", Expired: "badge-red" };
// export const PAYMENT_TYPES = ["Registration Fee", "Monthly Dues", "Daily Levy", "Permit Payment", "Fine Payment", "Donation", "Special Levy"]; 