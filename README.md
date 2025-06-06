# E2E Testing with Playwright

This project demonstrates end-to-end testing using Playwright for testing web forms and user interactions.

## 📋 Project Structure

```
tp-e2e-playwright/
├── public/
│   ├── contact.html    # Contact form page
│   └── order.html      # Order form page
├── tests/
│   ├── contact.spec.js # Contact form tests
│   └── order.spec.js   # Order form tests
└── test-results/       # Screenshots and test artifacts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Clone the repository
git clone git@github.com:Insu-qg/tp-e2e-playwright.git

# Install dependencies
npm install
```

## 🧪 Running Tests

```bash
# Start the local server
npx http-server -p 5500

# Run all tests
npm test

# Run specific test file
npm run contact  # Run contact form tests
npm run order    # Run order form tests

# Run tests with UI mode
npx playwright test --ui
```

## 📝 Test Scenarios

### Contact Form Tests
- Submit form successfully
- Validate required fields
- Handle invalid email format
- Check confirmation message

### Order Form Tests
- Place order with different products
- Test express and standard delivery options
- Validate form fields
- Handle error cases

## 📸 Test Results

Test results and screenshots are saved in the `test-results` directory:
- `formulaire-envoye.png`: Successful contact form submission
- `confirmation-{product}-{delivery}.png`: Order confirmations
- `error-{scenario}.png`: Error cases

## 🛠️ Technologies

- [Playwright](https://playwright.dev/) - E2E testing framework
- HTML/JavaScript - Test applications
- Node.js - Runtime environment

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
