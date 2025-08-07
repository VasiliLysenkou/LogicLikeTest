# LogicLike Test Task

A React Native application that displays educational courses from the LogicLike platform and allows filtering them by themes/tags.

## Features

- Fetches courses data from the LogicLike API
- Displays courses in a horizontal scrollable list
- Allows filtering courses by themes/tags
- Dynamically generates theme list from API response
- Supports horizontal orientation

## Screenshots

The application follows the design from Figma: [React Native Interview Design](https://www.figma.com/design/8aQkXlD9tNGOiUivspLji6/React-Native-Interview?node-id=1-6&t=GG8Ol6IwgZUIPiM7-4)

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation (Expo Router)
- Expo Image

## Project Structure

- `/app` - Main application screens and navigation
- `/components` - Reusable UI components
- `/services` - API and data handling services

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd LigicLikeTest
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```

4. Run on a device or emulator

- Scan the QR code with Expo Go app on your device
- Press 'a' to run on Android emulator
- Press 'i' to run on iOS simulator

## Implementation Details

The application uses local state management as specified in the requirements. It avoids unnecessary re-renders by:

1. Using `useCallback` for functions that are passed as props
2. Implementing proper dependency arrays in `useEffect` hooks
3. Only filtering courses when necessary

## API

The application fetches data from:

```
GET https://logiclike.com/docs/courses.json
```

Each course has the following structure:

```typescript
interface Course {
  name: string;
  id: string;
  image: string;
  bgColor: string;
  tags: string[];
}
```
