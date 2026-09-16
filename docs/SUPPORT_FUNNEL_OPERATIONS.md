# Support funnel operations

## Version one structure

1. One mobile first hero with the mission, next race, date, and one support action.
2. One location choice: International or Lebanon.
3. One international route: GoFundMe.
4. Two primary local routes after Lebanon is selected: Whish and OMT Pay.
5. Purpl and MyMonty behind More Lebanese wallets.
6. Six continent progress visual.
7. Verified funding summary.
8. Short mission story.
9. Trust, record status, and verified media source links.
10. Consent based supporter wall.
11. Partner, media, and share actions.

## Required environment values

```text
NEXT_PUBLIC_GOFUNDME_URL=https://gofund.me/5612179bc
NEXT_PUBLIC_LOCAL_WALLET_NUMBER="76 923 943"
NEXT_PUBLIC_LOCAL_WALLET_COPY_VALUE=+96176923943
NEXT_PUBLIC_SUPPORT_GOAL=30000
NEXT_PUBLIC_SUPPORT_CASH_RECEIVED=0
NEXT_PUBLIC_SUPPORT_COMMITTED_CASH=1000
NEXT_PUBLIC_SUPPORT_IN_KIND_VALUE=0
NEXT_PUBLIC_SUPPORT_CURRENCY=EUR
NEXT_PUBLIC_SUPPORT_UPDATED_AT="16 September 2026"
NEXT_PUBLIC_SUPPORTER_CONSENT_URL=
NEXT_PUBLIC_SUPPORT_EMAIL=protoufic@gmail.com
NEXT_PUBLIC_ANNAHAR_COVERAGE_URL=https://www.instagram.com/reel/DdT-aPmtUae/
NEXT_PUBLIC_NOURSAT_APPEARANCE_URL=https://www.instagram.com/reel/DdTav13JPn8/
NEXT_PUBLIC_TELE_LIBAN_APPEARANCE_URL=https://www.instagram.com/reel/Dc87f-ypZ6o/
NEXT_PUBLIC_GA4_ID=
```

The GoFundMe link must use HTTPS. Lebanese wallet routes use the confirmed receiving number and reveal it only after a wallet is selected. Funding progress counts only cash received.

Media names appear only when a verified source URL is configured.

## Private ledger rules

Use `ops/support-ledger-template.csv` as the private source of truth. Never import the private ledger into the website bundle.

The public cash total is the sum of `net_cash_reporting_currency` only where `status` is `received`.

Committed support is the sum of `commitment_amount_reporting_currency` only where `status` is `committed`.

In kind support is the sum of `in_kind_value_reporting_currency` only where `status` is `in_kind`.

Never add committed or in kind values to cash received.

Already paid expenses, covered expenses, and uncovered expenses should live in a separate reconciled budget tab. The public meter currently uses Toufic's confirmed EUR 30,000 cash target and EUR 0 received. Do not infer category totals until the budget tabs are reconciled.

## Supporter consent workflow

1. Record the payment privately.
2. Ask the supporter whether to show a full name, initials, or anonymous.
3. Ask separately whether to show country.
4. Ask separately whether to show contribution amount.
5. Store when and where consent was received.
6. Add only the approved display fields to `src/data/support.ts`.
7. Never publish payment references, email addresses, phone numbers, private notes, or bank details.

## UTM links

All links point to the same page. The campaign name remains stable so source comparison is clean.

| Use | URL |
| --- | --- |
| Instagram bio | `https://toufic.co/support?utm_source=instagram&utm_medium=bio&utm_campaign=six_continents_support` |
| Instagram Stories | `https://toufic.co/support?utm_source=instagram&utm_medium=story&utm_campaign=six_continents_support` |
| Annahar | `https://toufic.co/support?utm_source=annahar&utm_medium=earned_media&utm_campaign=six_continents_support` |
| Noursat | `https://toufic.co/support?utm_source=noursat&utm_medium=earned_media&utm_campaign=six_continents_support` |
| Télé Liban | `https://toufic.co/support?utm_source=tele_liban&utm_medium=earned_media&utm_campaign=six_continents_support` |
| WhatsApp | `https://toufic.co/support?utm_source=whatsapp&utm_medium=direct_share&utm_campaign=six_continents_support` |
| Canadian diaspora | `https://toufic.co/support?utm_source=canadian_diaspora&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| Australian diaspora | `https://toufic.co/support?utm_source=australian_diaspora&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| French diaspora | `https://toufic.co/support?utm_source=french_diaspora&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| United States diaspora | `https://toufic.co/support?utm_source=us_diaspora&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| Lebanese communities | `https://toufic.co/support?utm_source=lebanese_communities&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| Druze communities | `https://toufic.co/support?utm_source=druze_communities&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| Cycling communities | `https://toufic.co/support?utm_source=cycling_communities&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| Running communities | `https://toufic.co/support?utm_source=running_communities&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| Triathlon communities | `https://toufic.co/support?utm_source=triathlon_communities&utm_medium=community_outreach&utm_campaign=six_continents_support` |
| Media outreach | `https://toufic.co/support?utm_source=media_outreach&utm_medium=direct_pitch&utm_campaign=six_continents_support` |

Use `utm_content` only to separate two placements inside one source, such as `profile_button` and `video_caption`.

## Analytics events

| Event | Trigger |
| --- | --- |
| `support_landing_view` | Support page opens |
| `support_cta_click` | Main support action is pressed |
| `payment_region_selected` | International or Lebanon is chosen |
| `gofundme_click` | Verified GoFundMe link is opened |
| `whish_click` | Whish transfer instructions are opened |
| `omt_click` | OMT Pay transfer instructions are opened |
| `purpl_click` | Purpl is selected under more Lebanese wallets |
| `mymonty_click` | MyMonty is selected under more Lebanese wallets |
| `local_number_copy` | The confirmed receiving number is copied |
| `partner_enquiry_click` | Partner route is opened |
| `media_enquiry_click` | Media route is opened |
| `supporter_consent_click` | Supporter visibility route is opened |
| `share_click` | Share action is pressed |

The first party endpoint accepts only this event allowlist. It records the page path, UTM fields, referrer host, action placement, selected region, selected method, and country header when the hosting platform supplies it. It does not intentionally record names, email addresses, phone numbers, payment details, contribution amounts, precise location, user agent, or IP address.

Google Analytics is optional. The included setup defaults analytics storage and advertising storage to denied. Do not enable broader tracking without a compliant consent decision.

## Payment route test

For every provider, stop before submitting money.

1. Open from a real phone on cellular data.
2. For GoFundMe, confirm the domain and HTTPS certificate. For a wallet, open the official app.
3. Confirm the recipient name.
4. Confirm the available currency.
5. Confirm that the supporter chooses the amount.
6. Confirm the fee and who pays it.
7. Confirm an international card option only where advertised and needed.
8. Confirm back navigation returns cleanly to the page.
9. Confirm no account is required before reaching the provider unless the provider requires it.
10. Record screenshots of the recipient and review screens with sensitive details removed.

## Launch gate

Do not deploy until all of these are true:

1. GoFundMe organizer and withdrawal route are verified.
2. The public GoFundMe URL is verified and every local wallet route shows the correct receiving number.
3. The wallet number is confirmed for each service and remains hidden unless a manual transfer path truly needs it.
4. Public goal and cash received are reconciled.
5. Media source links are verified.
6. Record status wording is approved against the latest written correspondence.
7. Mobile visual review passes on iPhone and Android widths.
8. Toufic reviews the final preview and explicitly approves launch.
