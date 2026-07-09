# mddjclub.com Behaviors

## Global

- Header stays fixed at the top on home and list pages.
- Desktop navigation highlights the active route with blue text and a blue underline.
- Mobile versions collapse to a compact top bar.

## Home

- Hero is a static carousel-like banner with left and right circular controls visible.
- Category sidebar stays fixed-height beside the hero on desktop and collapses away on mobile.
- Product cards are static with hover-ready CTA treatment, but no extracted click-state styling beyond standard links.

## List

- Filter rows are static pills and chips in the captured state.
- Pagination is static in the captured state with page `1` active.
- Card grid changes from four columns on desktop to one column on narrow mobile widths.

## Login

- Desktop login page is split: blue marketing panel on the left, white auth panel on the right.
- Mobile login removes the left marketing panel and keeps only the auth card.
- Password login tab is active in the captured state; verification-code tab is inactive.

## Detail

- Product detail uses the same fixed site header and footer as the list page.
- Main content is a two-column desktop layout: image gallery left, purchase summary/actions right.
- Mobile stacks the gallery, summary card, seller card, action row, then detail sections.
- Gallery shows visible previous/next controls and pagination dots in the captured state.
- Four white information blocks appear below the gallery area: `基础信息`, `外观与属性`, `账户信息`, `其他信息`.
