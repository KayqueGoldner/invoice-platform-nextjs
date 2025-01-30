# [Invoice Platform](https://invoice-platform-nextjs-flame.vercel.app/)  

**A simple and efficient invoicing platform that allows users to create, manage, and track invoices with automated email notifications and analytics.**

![Application Screenshot](/invoice-platform.png "Application Screenshot")  

## 🚀 Features  

- **Authentication**: Secure login via email.  
- **Invoices**: Create, send, track, and manage invoices with automated reminders and deletion options.
- **Email**: Send automated and customized emails for invoices, reminders, and account notifications.
- **Analytics**: View data on invoices and payments.


## 🛠️ Technologies Used  

- **Frontend**:  
  - [Next.js](https://nextjs.org/) - A React framework for server-side rendering and static site generation.  

- **Backend**:  
  - [Prisma](https://www.prisma.io/) - An ORM tool for database interaction, ensuring type safety and seamless database queries.
  - [Mailtrap](https://mailtrap.io/) - Email Delivery Platform.
  - [Nodemailer](https://www.nodemailer.com/) - A module for Node.js applications that allows easy email sending.

- **Programming Language**:  
  - [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript for robust development.  

- **Styling**:  
  - [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework.  
  - [Shadcn UI](https://ui.shadcn.com/) - Accessible and customizable UI components.  
  - [Magic UI](https://magicui.design/) - A collection of re-usable components.

- **Authentication**:  
  - [Auth.js](https://authjs.dev/) - A runtime agnostic library based on standard Web APIs.  

## 📦 NPM Packages  

- [Lucide](https://lucide.dev/) - Open-source, customizable icon library.   
- [Sonner](https://sonner.emilkowal.ski/) - Minimal toast notifications for React. 
- [jsPDF](https://github.com/parallax/jsPDF) - A library to generate PDFs in JavaScript.


## 💻 Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/KayqueGoldner/invoice-platform-nextjs.git
```

### 2. Install Dependencies

```bash
cd invoice-platform-nextjs
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables

```bash
AUTH_SECRET=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=
MAILTRAP_TOKEN=
MAILTRAP_DEMO_EMAIL=
MAILTRAP_TEMPLATE_UUID=
MAILTRAP_EDIT_TEMPLATE_UUID=
MAILTRAP_REMINDER_TEMPLATE_UUID=
DATABASE_URL=
```

### 4. Run the Application

```bash
npm run dev
```

### 5. Access the Application

**You can access the application by opening the following URL in your browser:
http://localhost:3000**