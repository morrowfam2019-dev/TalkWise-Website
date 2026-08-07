# Brevo setup

Brevo holds the TalkWise mailing list and sends both email and SMS. The website
only ever *adds contacts* to it — campaigns are written inside Brevo, so you
don't need a developer to send anything.

Nothing here touches Whop. Membership, payment, and lessons stay on Whop; Brevo
is only for people who asked to hear from us.

---

## 1. Create the account

Sign up at <https://www.brevo.com>. The free plan is 300 emails/day and up to
100,000 stored contacts — plenty until launch.

> **Note:** free-plan emails carry Brevo branding. Removing it is roughly
> $9/month on the Starter plan. Worth doing before any real campaign goes out,
> since the branding undercuts the premium look of the site.

## 2. Create the list

**Contacts → Lists → Create a list.** Name it something like
`TalkWise Website Signups`.

Open the list and note its **numeric ID** — it's in the URL and the list table.
That number goes in `BREVO_LIST_ID`.

## 3. Create the contact attributes

**Contacts → Settings → Contact attributes → Add an attribute.**

The site sends these with every signup. Create each one exactly as named, or
Brevo rejects the contact:

| Attribute name  | Type   | What it holds                                  |
| --------------- | ------ | ---------------------------------------------- |
| `ROLE`          | Text   | Parent, Educator, English Learner, etc.        |
| `INTERESTS`     | Text   | Comma-separated topics they picked             |
| `SIGNUP_SOURCE` | Text   | Which form they used                           |
| `EMAIL_CONSENT` | Boolean| Whether they agreed to email                   |
| `SMS_CONSENT`   | Boolean| Whether they agreed to texts                   |
| `CONSENT_DATE`  | Text   | When they agreed                               |
| `CONSENT_IP`    | Text   | Where from — evidence if consent is disputed   |

`SMS` and `EMAIL` already exist in Brevo as built-ins. Don't recreate them.

## 4. Get the API key

**Top-right menu → SMTP & API → API Keys → Generate a new API key.**

Copy it immediately — Brevo shows it once.

## 5. Add both values to the site

Copy `.env.example` to `.env.local` in the project root and fill in:

```
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=3
```

`.env.local` is git-ignored, so the key never gets committed. Restart the dev
server after saving.

**Never paste the API key into a chat, a document, or a commit.** If it leaks,
regenerate it in Brevo immediately — the old key stops working the moment you do.

## 6. Check it works

Submit the form at `/updates`, then look in **Brevo → Contacts**. The address
should appear with its attributes filled in.

Until the two values are set, signups are written to the server log instead of
Brevo — nothing is lost while you're mid-setup.

---

## Before sending SMS in the US

US carriers require **10DLC registration** before a business can text
customers. This applies to every provider, not just Brevo.

- Register under **Brevo → SMS → sender settings**
- Expect roughly $4–15 one-time plus a few dollars monthly
- Approval typically takes a few days

Skipping it means messages get filtered or blocked outright.

The signup form already collects and stores SMS consent correctly, so you can
turn texting on whenever registration clears — nothing on the site needs to
change.

## Compliance rules already handled by the site

These are built into the form and the privacy policy. Keep them true in Brevo:

- Email and SMS consent are **separate**, and both start switched off.
- A phone number is only stored if SMS consent was given.
- Every marketing email needs a working unsubscribe link — Brevo adds this.
- SMS must honour **STOP** and **HELP**. Brevo handles these automatically.
- Never text a contact whose `SMS_CONSENT` is `false`.
