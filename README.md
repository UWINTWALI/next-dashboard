# Ledger

A straightforward invoice management system for businesses that need to get things done without the complexity.

---

## Getting Started

Ledger exists because I got tired of fighting with overly complicated bookkeeping software. It's a no-nonsense web application that handles the essentials: track invoices, manage customers, and see what's actually happening with your cash flow.

If you're looking for yet another bloated accounting suite with features you'll never use, this isn't it. If you need something that works and stays out of your way, you're in the right place.

---

## What It Does

### Invoice Management
- Create and send invoices that don't look like they were made in 1998
- Track invoice status (draft, sent, paid, overdue) without manual spreadsheets
- Set up recurring billing for those regular clients
- Keep a complete history of every invoice and its changes

### Customer Management
- Store customer details and contacts in one place
- Give customers a portal to view and pay their invoices
- Track customer credits and payment terms
- Stop asking "who owes us what?" every other day

### The Daily Grind
- It works on your phone, tablet, or whatever screen you're staring at
- Find invoices and customers without clicking through ten menus
- Bulk actions because nobody has time for one-by-one operations
- Dashboard that shows you what matters, not just a bunch of charts

### Numbers That Matter
- See your revenue, outstanding payments, and cash flow at a glance
- Generate reports for your accountant without wanting to throw your computer
- Track which customers actually pay on time (spoiler: it's not many)
- Export data when you need to get fancy with spreadsheets

---

## How It's Built

This isn't my first rodeo. The stack is picked based on what actually works in production, not what's trending on Twitter this week.

### Frontend
- **Next.js 14** - Because we need server-side rendering and API routes in one package
- **React 18** - Still the best tool for building UIs that don't make you want to quit programming
- **TypeScript** - Catches the dumb mistakes before they become production incidents
- **Tailwind CSS** - Write CSS without writing CSS, and it actually makes sense
- **Heroicons** - Clean icons that don't look like they were designed by committee

### Backend & Database
- **Next.js API Routes** - Simple enough to not need a separate backend for most things
- **Prisma** - Finally, an ORM that doesn't make you want to write raw SQL out of spite
- **PostgreSQL** - Reliable, battle-tested, and won't lose your data when you least expect it
- **Redis** - For when you need things to not be painfully slow

### Authentication & Security
- **NextAuth.js** - Getting authentication right is hard, let someone else worry about it
- **bcrypt** - Because storing passwords in plain text is still somehow a thing in 2024
- **jsonwebtoken** - The industry standard for a reason

### Development Stuff
- **ESLint** - Catches the obvious mistakes and keeps code consistent
- **Prettier** - Stops arguments about code formatting before they start
- **Husky** - Git hooks that actually save you from committing broken code
- **Vercel** - Deploying shouldn't be harder than writing the code

---

## Getting It Running

### What You Need First
- Node.js 18 or newer ([get it here](https://nodejs.org/))
- npm, yarn, or pnpm (whatever floats your boat)
- PostgreSQL 13 or newer ([install guide](https://www.postgresql.org/download/))
- Redis (optional, but really recommended for anything beyond localhost)

### Step 1: Get the Code
```bash
git clone https://github.com/your-username/ledger.git
cd ledger
```
### Step 2: Install the Dependencies
```bash
npm install
# or if you prefer yarn: yarn install
# or pnpm: pnpm install
```

### Step 3: Set Up Environment Stuff
Copy the example file and fill in your actual values:

```bash
cp .env.example .env.local
```
Edit .env.local. Don't skip this part or nothing will work:

```ENV
POSTGRES_URL="postgres***************"
POSTGRES_USER="postgres"
POSTGRES_HOST="db***************"supabase.co"
SUPABASE_JWT_SECRET***************"
NEXT_PUBLIC_SUPABASE_ANON_KEY***************"
POSTGRES_PRISMA_URL="postgres:***************""
POSTGRES_PASSWORD="***************""
POSTGRES_DATABASE="postgres"
SUPABASE_URL="https://***************".supabase.co"
SUPABASE_ANON_KEY="***************""
NEXT_PUBLIC_SUPABASE_URL="https://***************".supabase.co"
SUPABASE_SERVICE_ROLE_KEY="***************".."
POSTGRES_URL_NON_POOLING="postgres***************""
# Adding Auth secrete

AUTH_SECRET=***************"

# The Two Ways You Can Connect
# Direct to Postgres → via POSTGRES_URL (used by Prisma/Drizzle ORM).
# Via Supabase Client SDK → via NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY.
# Both are valid. Most apps use Supabase SDK for auth/storage and Prisma for database queries.
```
### Step 4: Database Setup
Generate postgres Database storage 'superbase' from vercel
### Step 5: Fire It Up
```bash
npm run dev
```
Now open http://localhost:3000 in your browser. If everything worked, you should see the application running.

# Using This Thing

## First Steps
1. **Create an account** on the signup page.
2. **Add your company details** (name, logo, that sort of thing).
3. **Add your customers** (import a CSV or add them one by one).
4. **Create your first invoice**.

## Getting Around
The interface should be pretty intuitive, but here's the lay of the land:

- **Dashboard** – Your home base. Shows you what's urgent, what's coming due, and where the money is (or isn't).
- **Invoices** – Where you'll spend most of your time. Create new ones, see what's outstanding, send reminders to people who forgot to pay.
- **Customers** – Manage your client list, see their payment history, find out who's consistently late.
- **Analytics** – Numbers and charts for when you need to explain to your partners why cash flow is tight this month.

## Pro Tips
- Use keyboard shortcuts. Press `?` anytime to see what's available.
- Set up automatic reminders. Your future self will thank you.
- Back up your data regularly. I've built in exports for a reason.
- Give your customers access to the portal. Less email back-and-forth for everyone.

## When Things Go Wrong
- **Can't connect to the database?** Make sure PostgreSQL is actually running and your `.env.local` file has the right connection string.
- **Build errors appearing?** Try clearing the Next.js cache:  
  ```bash
  rm -rf .next

# Contributing

Code contributions are welcome. But let's be realistic about how this works.

## The Ground Rules
- **Look at existing code first** – Don't submit something that looks completely different from everything else.
- **Make it actually work** – Test your changes. I'm not your QA team.
- **Documentation** – If you add something new, update the docs. Future you will appreciate it.
- **Be practical** – This isn't an academic exercise. Build things that solve real problems.

## Getting Set Up to Contribute
1. **Fork the repository and clone it locally:**

```bash
git clone https://github.com/your-username/ledger.git
cd ledger
git remote add upstream https://github.com/original-username/ledger.git
````

2. **Get your development environment running:**

```bash
npm install
cp .env.example .env.local
# Fill in your .env.local with actual values
npx prisma migrate dev
npx prisma generate
```

3. **Create a feature branch:**

```bash
git checkout -b feature/your-feature-name
```

## Pull Request Process

* Work on your **feature branch**, not `main`.
* Follow the **coding style** that's already established.
* Write **tests** if you're adding new functionality.
* Update any **documentation** that's affected.
* Run the linter and formatter:

```bash
npm run lint
npm run format
```

* Test everything works:

```bash
npm run test
npm run build
```

* Submit your **PR** with a clear description of what you changed and why.

## Code Style

* Use **TypeScript**. It catches dumb mistakes.
* Tailwind classes should follow the existing **patterns**.
* Keep components **focused and small**. Giant components are a nightmare to maintain.
* **Comment things that aren't obvious**. Don't comment obvious things.
* If you break something, **fix it**. Don't leave broken code for someone else.

## Reporting Issues

Before creating a new issue:

* **Search existing issues first.** Your problem might already be reported.
* **Check the documentation.** The answer might be there.
* Provide **useful information**:

  * What you were trying to do
  * What actually happened
  * What you expected to happen
  * Your environment (OS, browser versions, Node version, etc.)


# License

This project is under the **MIT License**. See the `LICENSE` file for details.

**In plain terms:** You can do whatever you want with this code, but don't come crying to me if it breaks something important. The license protects me, not restricts you.

# Notes

This project exists because I needed something simple for my own business. It's **not trying to be the next QuickBooks** or compete with enterprise accounting software. It's meant for small businesses, freelancers, and anyone who needs to track invoices without spending a fortune on software.

- If you find it useful, great.  
- If not, no hard feelings.  
- Code is provided **as-is**, with no warranties.  
- Feel free to fork it and adapt it to your specific needs.

## Credit Where It's Due

- **Next.js** – for building an actually good framework.  
- **Tailwind CSS** – for making CSS bearable again.  
- **Prisma** – for not being another terrible ORM.  
- **All contributors** who've made this better than I could alone.

If you have questions, open an issue. If you want to chat, find me on the discussions tab.
