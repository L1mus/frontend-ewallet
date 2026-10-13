# E-Wallet App - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/mit)
<br>
Frontend project for E-Wallet dashboard by Ali Mustadji (Koda Tech).

## Technologies Used

- [![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react&logoColor=white)](https://react.dev/)
- [![Vite](https://img.shields.io/badge/Vite-8.0.1-violet?logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![Redux](https://img.shields.io/badge/Redux_Toolkit-6.0.0-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
- [![Nginx](https://img.shields.io/badge/Nginx-1.31.0-009639?logo=nginx&logoColor=white)](https://nginx.org/)
- [![Docker](https://img.shields.io/badge/Docker-29.4.2-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

## Features

- Mobile-First Responsive UI
- User Authentication (Login, Logout, Create PIN)
- Interactive Dashboard (Balance, Transaction History)
- Fund Transfer & Top Up Interfaces
- Profile Management


## Usage Instruction

### Environment Setup

1. Create your environment file on the root directory named `.env`

```env
# Use relative path if using nginx reverse proxy
VITE_API_URL=/ewallet
```

### Running the Application (Local Development)

1. Clone this repository

```bash
$ git clone https://github.com/L1mus/frontend-ewallet.git
```

2. Install dependency

```bash
$ npm install
```

3. Run the development server

```bash
$ npm run dev
```


## Changelog

| Version | Description                                                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1.0  | Setup Docker multi-stage build, Nginx and setup GitHub Actions for GHCR deployment config by [ilhammursidi](https://github.com/ilhammursidi) |

## How to Contribute

- Fork this repository
- Create your changes
- Commit your changes (Please strictly follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard: `feat:`, `fix:`, `chore:`, `docs:`)
- Push to the branch
- Open a Pull Request

### Screenshot
![alt text](landingpage.png)

![alt text](login.png)

![alt text](dashboard.png)



[Preview](https://react-ewallet-project.vercel.app/)

## License

This project is licensed under the MIT License

## Related Project

[Backend E-Wallet Repository](https://github.com/L1mus/frontend-ewallet.git)