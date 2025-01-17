# Mysa HQ Installer App

A Vue.js web application for guiding installers through the process of setting up Mysa HQ thermostats.

## Features

- Step-by-step installation wizard
- Photo documentation of installation
- HVAC system configuration
- Installation verification
- Feedback collection

## Tech Stack

- Vue 3 (Composition API)
- Vuex for state management
- Vue Router for navigation
- Tailwind CSS for styling
- Vite for development and building

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable Vue components
│   ├── base/        # Base UI components
│   ├── config/      # Configuration-specific components
│   └── photos/      # Photo handling components
├── composables/     # Vue composables (hooks)
├── services/        # API and external service integrations
├── store/          # Vuex store modules
├── styles/         # Global styles and Tailwind configuration
├── utils/          # Utility functions
└── views/          # Page components
    └── config/     # Configuration wizard views
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zgreen123935/commercial-smart-thermostats.git
cd commercial-smart-thermostats
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Component Documentation

### Base Components

- `AppButton`: Standard button component with variants
- `AppHeader`: Page header with navigation
- `BaseView`: Base layout component
- `InfoCard`: Information display card
- `AppDialog`: Modal dialog component

### Configuration Components

- `ConfigItem`: Base configuration option component
- `SystemType`: HVAC system type selector
- `HeatingType`: Heating configuration
- `CoolingType`: Cooling configuration
- `FanControl`: Fan speed control settings
- `EmergencyHeat`: Emergency heating options
- `ReversingValve`: Heat pump reversing valve settings

### Photo Components

- `PhotoUpload`: Photo capture and upload component

## State Management

The application uses Vuex for state management with the following modules:

- Site Details
- Installer Information
- Thermostat Configuration
- Installation Progress
- User Feedback

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is proprietary software owned by Mysa.

## Design System

See [DESIGN.md](DESIGN.md) for detailed information about our design system, including:
- Typography
- Color palette
- Component styles
- Layout guidelines
