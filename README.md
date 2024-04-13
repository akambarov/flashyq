# FlashyQ

_A dynamic quiz app that helps you engage in active recall with your data._

## Features

FlashyQ enhances your learning experience by offering a dynamic quiz environment. Whether you're a student, educator, or quiz enthusiast, FlashyQ provides an engaging platform to test your knowledge and learn new things.

- Simply upload a `.csv` file containing two columns (the first column entries should be questions and the second column entries should be their corresponding answers).
- FlashyQ randomly selects 10 questions from the first column of the uploaded file, ensuring a unique quiz experience each time.
- Each question will have 4 options, ordered randomly (one of these options will be the correct answer, and the other three will be randomly selected from the second column of the uploaded file).
- After completing the quiz, you can view your score, review which questions you answered correctly/incorrectly, and restart the quiz.

## Running FlashyQ locally

Before running FlashyQ locally, ensure you have `Node.js` and `npm` installed on your system. Then, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/flashyq.git`
2. Navigate to the project directory: `cd flashyq`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Project Structure

The directory structure is as follows:

- `public`: Static assets.
- `src`: The source code for the app.
  - `components`: React components for different parts of the app.
  - `styles`: CSS files for styling the components.
  - `types.ts`: TypeScript types used throughout the application.
  - `App.tsx`: The main entry point of the app.
  - `index.tsx`: Renders the root component into the DOM.
