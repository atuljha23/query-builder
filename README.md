# Query Builder

This project is a Query Builder application built with Vite, React, TypeScript, and Express. It allows you to create and manage query rules and save them to a JSON file.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v20.12 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (v10.5 or higher): Comes bundled with Node.js.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/atuljha23/query-builder.git
   cd query-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Testing

Run the following command to execute tests using Playwright:

```bash
npm run test:playwright
```

This will run end-to-end tests to ensure the application behaves as expected.

### Libraries Used

The project leverages the following libraries and frameworks:

1. **TailwindCSS**: A utility-first CSS framework for styling.
2. **ShadCN UI**: A collection of reusable UI components.
3. **Acernity UI**: Custom UI components for enhanced user experience.
4. **CodeBlock**: For rendering json snippets in the application.
5. **Playwright**: A testing library for end-to-end testing.

### Features

- **Dynamic Query Building**: Create and manage complex query rules with ease.
- **JSON Export**: Save your query rules to a JSON file.
- **DARK MODE**: UI works well with system preferance light/dark mode.

### License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
