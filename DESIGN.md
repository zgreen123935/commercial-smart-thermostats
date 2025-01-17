# Mysa Design System

This document outlines the design system used in the Mysa HQ Installer web application, matching the mobile app's design.

## Typography

### Screen Title (`MDS-Home/title/large`)
Used for the main header at the top of each screen.
```css
font-family: Roboto;
font-size: 22px;
font-weight: 400;
line-height: 28px;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;
```

### Section Heading (`MDS-Home/headline/small`)
Used for major section headings within screens.
```css
font-family: Roboto;
font-size: 24px;
font-weight: 400;
line-height: 32px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
```

### Body Text (`MDS-Home/body/large`)
Used for common text content.
```css
font-family: Roboto;
font-size: 16px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0.5px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
```

### Helper Text (`MDS-Home/body/medium`)
Used for supporting information and helper text.
```css
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.25px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
```

## Colors

### Backgrounds
- Screen Background: `#FBFBFB`
- Surface Container Low: `#F5F5F5` (Used for cards and containers)

### Text
- Common Text (On Surface): `#191C20`
- Secondary Text (On Surface Variant): `#42474E`

### Call to Action
#### Primary
- Background: `#35618E`
- Text: `#FFFFFF`

#### Secondary
- Background: `#D1E4FF`
- Text: `#001D36`

#### Destructive
- Background: `#FFDAD6`
- Text: `#410002`

### States
#### Disabled
- Surface: `#1E1A2061`
- Text: `#1E1A201F`

### Icons & Outlines
- Icon Color: `#42474E`
- Primary Outline: `#73777F`
- Secondary Outline: `#C3C7CF`

## Usage in Components

### Buttons
- Primary buttons use Primary/On-Primary colors
- Secondary buttons use Primary-Container/On-Primary-Container colors
- Destructive actions use Error-Container/On-Error-Container colors

### Cards & Containers
- Use Surface-Container-Low for background
- Text follows the typography hierarchy:
  - Headings use MDS-Home/headline/small
  - Body text uses MDS-Home/body/large
  - Helper text uses MDS-Home/body/medium

### Icons
- Use On-Surface-Variant color (`#42474E`)
- Maintain consistent 24x24px touch targets

### Form Elements
- Use Outline for borders
- Use Outline-Variant for disabled states
- Follow the typography scale for labels and inputs
