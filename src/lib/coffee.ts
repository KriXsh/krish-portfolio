// Everything the coffee bar sells, and where the money goes. Change prices or
// UPI IDs here; the menu, cup, receipt and QR all read from this file.

export type CoffeeItem = {
  id: string;
  name: string;
  price: number;
  blurb: string;
  /** How full the cup gets, 0..1. */
  fill: number;
};

export const MENU: CoffeeItem[] = [
  { id: "espresso", name: "Espresso", price: 49, blurb: "A quick shot. Fixes one bug.", fill: 0.32 },
  { id: "cappuccino", name: "Cappuccino", price: 99, blurb: "Powers a late-night deploy.", fill: 0.55 },
  { id: "cold-brew", name: "Cold Brew", price: 199, blurb: "Keeps a side project alive.", fill: 0.78 },
  { id: "sprint", name: "Sprint Fuel", price: 499, blurb: "A whole open-source sprint.", fill: 1 },
];

export const MIN_CUSTOM = 10;
export const MAX_CUSTOM = 10000;

/** Your own printed UPI QR (static: payer types the amount). It pays UPI_IDS[0]. */
export const QR_IMAGE = "/CofffeQR.jpeg";

export const UPI_IDS = [
  { label: "Paytm", vpa: "7908443945@ptyes" },
  { label: "Google Pay", vpa: "krishnendughosal999@oksbi" },
];

export const PAYEE_NAME = "Krishnendu Ghosal";
export const SPONSORS_URL = "https://github.com/sponsors/KriXsh";

// USD support. Bank account numbers are deliberately NOT stored here or shown
// on the site: people request them and they're sent privately by email.
export const CONTACT_EMAIL = "krishnendughosal999@gmail.com";

/** Public limits of the USD receiving account (Airtm). */
export const USD_BANK = {
  achMin: 5,
  achDays: "2–4 business days",
  wireMin: 1500,
  wireDays: "1 business day",
};

const bankRequestBody = `Hi Krish,

I'd like to send you a payment in USD by US bank transfer.

Amount (USD):
Method (ACH / wire):
Purpose (coffee / sponsorship / invoice):

Please share the bank details.

Thanks!`;

export const BANK_REQUEST_MAILTO =
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("USD bank transfer details request")}` +
  `&body=${encodeURIComponent(bankRequestBody)}`;

/** A standard UPI intent. Scanned as a QR, or opened directly on a phone, it
    lands in any UPI app with payee, amount and note pre-filled. */
export function upiLink(vpa: string, amount: number, note: string) {
  // `pa` stays literal: some UPI apps reject a percent-encoded "@".
  const enc = encodeURIComponent;
  return (
    `upi://pay?pa=${vpa}&pn=${enc(PAYEE_NAME)}&am=${amount.toFixed(2)}` +
    `&cu=INR&tn=${enc(note.trim() || "Coffee for Krish")}`
  );
}

export const fillFor = (amount: number) => Math.min(1, Math.max(0.12, amount / 499));
