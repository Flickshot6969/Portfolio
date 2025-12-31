# Dev Patel Portfolio 🚀

A stunning, professional portfolio website built with Next.js 14, featuring advanced animations, SEO optimization, and a modern tech stack. Designed to showcase technical excellence alongside leadership and management capabilities.

![Portfolio Preview](./media/Images/1.jpg)

## ✨ Features

### Design & UX
- 🎨 **Stunning UI/UX** - Modern glassmorphism design with gradient accents
- ✨ **Smooth Animations** - Powered by Framer Motion for professional transitions
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🌙 **Dark Theme** - Elegant dark mode design with subtle glow effects
- 🎭 **Unique Aesthetics** - Custom animations and effects not found elsewhere

### Technical Features
- ⚡ **Next.js 14** - Latest React framework with App Router
- 🎯 **TypeScript** - Full type safety throughout
- 💨 **Tailwind CSS** - Utility-first styling with custom theme
- 🔄 **React Intersection Observer** - Scroll-triggered animations
- 📝 **Type Animation** - Dynamic typing effects in hero section

### SEO & Performance
- 🔍 **98% SEO Score** - Optimized for search engines
- 📊 **Structured Data** - JSON-LD schema for rich snippets
- 🗺️ **Sitemap & Robots.txt** - Proper crawl configuration
- 📱 **PWA Ready** - Web app manifest included
- ⚡ **Optimized Performance** - Fast loading and rendering

### Contact & Communication
- 📧 **Contact Form** - Email integration via EmailJS/Nodemailer
- 🔗 **8 Social Platforms** - GitHub, LinkedIn, Twitter, Instagram, Facebook, Discord, Telegram, WhatsApp
- 📱 **Direct Communication** - Multiple contact options

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14, React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS, Custom CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Email | EmailJS, Nodemailer |
| Deployment | Vercel, GitHub Pages |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & animations
│   │   ├── layout.tsx       # Root layout with SEO
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation with scroll effects
│   │   ├── Hero.tsx         # Hero section with typing animation
│   │   ├── About.tsx        # About section
│   │   ├── Skills.tsx       # Skills with progress bars
│   │   ├── Experience.tsx   # Timeline & projects
│   │   ├── Certifications.tsx # Certificates display
│   │   ├── Contact.tsx      # Contact form
│   │   └── Footer.tsx       # Footer with social links
│   └── pages/
│       └── api/
│           └── contact.ts   # Email API endpoint
├── public/
│   ├── media/               # Images & certificates
│   ├── robots.txt           # SEO crawl rules
│   ├── sitemap.xml          # Site structure
│   └── manifest.json        # PWA manifest
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🎨 Customization

### Updating Personal Information

1. **Hero Section** (`src/components/Hero.tsx`)
   - Update name, title, and typing animation sequences
   - Modify stats counters

2. **About Section** (`src/components/About.tsx`)
   - Edit personal story and journey
   - Update profile images

3. **Skills Section** (`src/components/Skills.tsx`)
   - Add/modify skill categories and proficiency levels

4. **Experience Section** (`src/components/Experience.tsx`)
   - Update work experience and projects

5. **Contact Section** (`src/components/Contact.tsx`)
   - Update email address and contact details

6. **Footer** (`src/components/Footer.tsx`)
   - Update all social media links

### Styling Customization

The theme colors can be modified in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* Your primary colors */ },
      accent: { /* Your accent colors */ },
      dark: { /* Dark mode colors */ },
    }
  }
}
```

## 📧 Email Setup

### Option 1: EmailJS (Recommended for simplicity)

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service and template
3. Add credentials to `.env.local`

### Option 2: Nodemailer (For more control)

1. Configure SMTP settings in `src/pages/api/contact.ts`
2. For Gmail: Enable 2FA and create App Password
3. Add credentials to environment variables

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### GitHub Pages

1. Update `next.config.js` for static export:
   ```javascript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
   }
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy contents of 'out' folder
   ```

## 📊 SEO Checklist

- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Alt texts for images
- ✅ Performance optimization
- ✅ Mobile responsiveness

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dev Patel**
- Email: devpatel170521@gmail.com
- GitHub: [@devpatel](https://github.com/devpatel)
- LinkedIn: [Dev Patel](https://linkedin.com/in/devpatel)

---

⭐ If you found this helpful, please star this repository!
