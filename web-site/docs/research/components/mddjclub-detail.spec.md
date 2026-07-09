# MddjclubDetail Specification

## Overview

- **Target file:** `src/app/detail/[id]/page.tsx`
- **Screenshot:** `docs/design-references/mddjclub.com/detail-89131-desktop.png`
- **Interaction model:** click-driven gallery controls plus static content blocks

## DOM Structure

- Shared site header
- Back link row
- Main detail area
  - Left: large gallery/media card
  - Right: price summary card, seller card, action row
- Four stacked white detail sections beneath
- Shared dark footer

## Computed Styles

### Page shell

- Background: light gray `rgb(245, 247, 250)`
- Content cards: white with soft shadows and rounded corners

### Summary card

- Discount pill: bright blue
- Price: strong red/orange emphasis
- Meta chips: soft gray rounded pills

### Info sections

- Section card title bold and dark
- Each row rendered as light rounded inset block

## States & Behaviors

### Gallery switching

- **Trigger:** click previous / next control or indicator dot
- **State A:** current image visible
- **State B:** selected gallery image visible
- **Transition:** immediate swap in current implementation
- **Implementation approach:** local React state

### Order action

- **Trigger:** click `下单`
- **State A:** detail page visible
- **State B:** contact modal opens with `求购` preselected
- **Implementation approach:** shared lead modal

## Assets

- Main gallery images: `/public/images/mddjclub/10-*.jpg`, `/18-*.jpg`, `/19-*.jpg`
- Seller avatar: `/public/images/mddjclub/5-*.png`

## Text Content

- Product title: `钻石953m9格7体7负`
- Price: `2076.55`
- Sections: `基础信息`, `外观与属性`, `账户信息`, `其他信息`

## Responsive Behavior

- **Desktop (1440px):** 2-column hero area with sidebar actions
- **Tablet (768px):** main area begins collapsing with tighter spacing
- **Mobile (390px):** full vertical stack, full-width cards, compact footer columns
- **Breakpoint:** main two-column layout switches below large screens
