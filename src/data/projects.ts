export type Screenshot = { src: string; caption: string };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  kind: string;
  summary: string;
  problem: string;
  stack: string[];
  features: { role: string; items: string[] }[];
  highlights: { title: string; text: string }[];
  security: string[];
  learned: string[];
  screenshots: Screenshot[];
  liveUrl: string; // add the deployed link here later
  repoUrl: string; // add the GitHub link here if you make the repo public
};

const sbc = (file: string, caption: string): Screenshot => ({
  src: `/projects/student-book-centre/${file}`,
  caption,
});

export const projects: Project[] = [
  {
    slug: 'emas',
    title: 'EMAS',
    subtitle: 'Event Management System with event recommendations',
    kind: 'Final Year Project',
    summary:
      'A university event platform for students, organisers and admins, with a hybrid recommendation engine that suggests events each student is likely to join.',
    problem:
      'University events are spread across Google Forms, posters and chat groups, so students miss events and organisers manage registrations by hand. EMAS puts discovery, registration and event-day activities in one system.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'Socket.IO', 'JWT', 'bcrypt'],
    features: [
      {
        role: 'Students',
        items: [
          'Browse and register for events, with a hard limit at each event\'s capacity',
          'Personalised event recommendations',
          'Live event chat and live quizzes',
          'Profile, interests and notifications, including event reminders',
          'Feedback after an event',
        ],
      },
      {
        role: 'Organisers',
        items: [
          'Create events and submit them for admin approval',
          'Confirm or reject registrations',
          'Run a live quiz and a lucky draw during the event',
          'Analytics for each event',
        ],
      },
      {
        role: 'Admin',
        items: [
          'Approve or reject events',
          'Manage users, including banning accounts',
          'Platform-wide analytics and generated reports',
        ],
      },
    ],
    highlights: [
      {
        title: 'Hybrid recommendation engine',
        text: 'Combines content-based filtering (matching a student\'s interests to event details) with collaborative filtering (what similar students joined). Score = α · CBF + (1 − α) · CF, with α configurable. Both parts are scaled to the same 0 to 1 range so the weighting is fair.',
      },
      {
        title: 'Real-time features',
        text: 'Event chat, live quizzes and the lucky draw run over Socket.IO, so every participant sees updates instantly.',
      },
      {
        title: 'Background jobs',
        text: 'Events close automatically when the registration deadline passes, and students get reminders before an event.',
      },
    ],
    security: [
      'Passwords hashed with bcrypt (cost factor 12)',
      'JWT authentication, with role checks on every protected route',
      'Banned accounts are rejected on every request and every socket connection, not only at login',
      'CORS restricted to the client\'s own address',
    ],
    learned: [
      'Designing a MongoDB schema across 11 collections and keeping it consistent with the thesis diagrams',
      'Structuring an Express API by domain, with access control in middleware',
      'Building and tuning a recommendation algorithm',
    ],
    screenshots: [],
    liveUrl: '',
    repoUrl: '', // https://github.com/insyirahdyn/FYP (private for now)
  },
  {
    slug: 'student-book-centre',
    title: 'Student Book Centre',
    subtitle: 'Marketplace for preloved university textbooks',
    kind: 'Group project',
    summary:
      'A web marketplace where university students buy and sell preloved textbooks. Sellers list a book, an admin approves it, and approved books appear in each faculty\'s catalog.',
    problem:
      'Students sell used textbooks through scattered chat groups, which makes it hard to find a book for a specific course. This system gives each faculty a searchable catalog, with admin approval so listings stay trustworthy.',
    stack: ['PHP 8', 'MySQL / MariaDB', 'JavaScript', 'HTML & CSS', 'Chart.js', 'XAMPP'],
    features: [
      {
        role: 'Students',
        items: [
          'Sign up, log in and reset password',
          'Browse books by faculty and search by title or author',
          'Cart that keeps items across faculties, then invoice, payment and confirmation',
          'List a book for sale with a photo and track its approval status',
          'Purchase history',
        ],
      },
      {
        role: 'Admin',
        items: [
          'Dashboard with pending books, approved books and registered users',
          'Approve or reject listings, filtered by faculty',
          'All transactions with the books in each one',
          'Data analysis charts, printable as PDF',
        ],
      },
    ],
    highlights: [
      {
        title: 'Approval workflow',
        text: 'Each listing moves from pending to approved or rejected, and only approved books are served to the catalog pages.',
      },
      {
        title: 'Data analysis',
        text: 'Chart.js charts show approval status, approved books per faculty and monthly sales.',
      },
    ],
    security: [
      'All SQL uses prepared statements, which prevents SQL injection',
      'Passwords hashed with password_hash() and checked with password_verify()',
      'Separate session checks for student pages and admin pages',
      'User input escaped before it is shown, which prevents XSS',
      'Uploads must be real images and are saved under random file names',
    ],
    learned: [
      'Designing a relational database for listings, invoices and invoice items',
      'Building a full checkout flow without a framework',
      'Working in a team on one codebase',
    ],
    screenshots: [
      sbc('01-landing.png', 'Landing page'),
      sbc('03-student-home.png', 'Student home'),
      sbc('04-faculty-catalog.png', 'Faculty catalog with search'),
      sbc('05-book-details.png', 'Book details'),
      sbc('06-cart.png', 'Cart'),
      sbc('07-invoice.png', 'Invoice'),
      sbc('08-payment.png', 'Payment form (demo, card details are never sent)'),
      sbc('10-sell-book-form.png', 'Listing a book for sale'),
      sbc('11-admin-dashboard.png', 'Admin dashboard'),
      sbc('12-admin-books-approval.png', 'Approving listings'),
      sbc('13-admin-data-analysis.png', 'Data analysis charts'),
      sbc('14-admin-transactions.png', 'All transactions'),
    ],
    liveUrl: '',
    repoUrl: '', // https://github.com/insyirahdyn/student_book_centre (private for now)
  },
];
