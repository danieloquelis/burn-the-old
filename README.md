# Burn the Old

**Minimalistic latin american tradition for new year. Burn all what you don't want in your life anymore.**

A web-based 3D simulation of the traditional "Muñeco de Año Viejo" burning ritual for New Year. Users can interact with a 3D model, add the things they want to leave behind in the past year, and watch the muñeco burn at midnight.

## Features

- **3D Muñeco Model**: A low-poly, interactive doll rendered using Three.js and React Three Fiber.
- **User Interaction**: Users can submit what they want to leave behind, and their submissions are displayed around the muñeco.
- **Burning Animation**: The muñeco burns at midnight, symbolizing renewal and starting fresh.
- **Database Integration**: User submissions are stored in a NeonDB database using Prisma.
- **Environmentally Friendly**: A digital alternative to the traditional burning ritual, reducing environmental impact.

## Technology Stack

- **Next.js**: For building the web application.
- **Three.js & React Three Fiber**: For 3D rendering and animations.
- **Prisma**: For database access and management.
- **NeonDB**: For lightweight and efficient cloud database hosting.
- **Tailwind**: For styling components.

## Getting Started

### Prerequisites

- Node.js (v20)
- Yarn or npm
- A NeonDB account (for database setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/daneloquelis/burn-the-old.git
   ```
2. Navigate to the project folder:
   ```bash
   cd burn-the-old
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Set up the environment variables by creating a `.env` file:
   ```
   DATABASE_URL=your-neondb-url
   ```
5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Start the development server:
   ```bash
   yarn dev
   ```

### Hosting

Deploy your application on platforms like Vercel for seamless hosting and integration with Next.js.

## Usage

1. Open the website.
2. Submit things you want to leave behind in the input field.
3. Watch the muñeco burn at midnight.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by the Latin American tradition of burning the "Muñeco de Año Viejo."
- Built using [Next.js](https://nextjs.org/), [Three.js](https://threejs.org/), and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).

---

Happy New Year! 🎉 May this project help you leave the past behind and embrace a fresh start.