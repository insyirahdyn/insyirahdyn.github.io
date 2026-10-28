// Your details. Leave a value as '' to hide that link or button on the site.
export const site = {
  name: 'Insyirah',
  role: 'Final-year computing student',
  university: 'UiTM Shah Alam',
  tagline:
    'I build full-stack web systems, from database design to the interface people use, and I am exploring cybersecurity.',
  location: 'Malaysia',
  email: '',
  github: 'https://github.com/insyirahdyn',
  linkedin: '',
  cv: '', // e.g. '/cv.pdf' after putting cv.pdf in the public/ folder
};

export const skills = [
  { group: 'Programming', icon: 'code', items: ['JavaScript', 'Python', 'PHP', 'SQL'] },
  { group: 'Web development', icon: 'monitor', items: ['React', 'Node.js', 'Express', 'HTML & CSS', 'REST APIs', 'Socket.IO'] },
  { group: 'Databases', icon: 'database', items: ['MongoDB', 'MySQL / MariaDB', 'Data modelling'] },
  { group: 'Tools', icon: 'wrench', items: ['Git & GitHub', 'Vite', 'Vercel', 'XAMPP', 'Linux / Bash'] },
  { group: 'Security', icon: 'shield', items: ['Authentication (JWT, bcrypt)', 'Incident response', 'NIST CSF', 'Risk assessment', 'Wireshark & tcpdump'] },
];

export const certifications = [
  {
    name: 'Google Cybersecurity Certificate',
    issuer: 'Google, on Coursera',
    date: 'Sep 2026',
    detail: '9 courses: security foundations, risk management, networks, Linux and SQL, threats and vulnerabilities, detection and response, Python automation, and job readiness.',
    url: 'https://coursera.org/verify/professional-cert/HCKH2CHR2WSA',
    badge: '/certificates/google-cybersecurity-badge.png',
  },
];
