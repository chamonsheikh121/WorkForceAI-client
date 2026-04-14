// Mock data generation for enterprise HR SaaS

const departments = ['Engineering', 'Sales', 'Marketing', 'Finance', 'HR', 'Operations', 'Product', 'Design', 'Legal', 'Support'];
const positions = {
  Engineering: ['Software Engineer', 'Senior Engineer', 'Staff Engineer', 'Engineering Manager', 'DevOps Engineer', 'QA Engineer', 'Frontend Developer', 'Backend Developer'],
  Sales: ['Account Executive', 'Sales Manager', 'SDR', 'VP Sales', 'Sales Engineer', 'Account Manager'],
  Marketing: ['Marketing Manager', 'Content Strategist', 'Growth Lead', 'SEO Specialist', 'Brand Manager', 'CMO'],
  Finance: ['Accountant', 'Financial Analyst', 'CFO', 'Controller', 'Payroll Specialist'],
  HR: ['HR Manager', 'Recruiter', 'HR Director', 'People Operations', 'Talent Acquisition'],
  Operations: ['Operations Manager', 'COO', 'Logistics Coordinator', 'Supply Chain Manager'],
  Product: ['Product Manager', 'Product Owner', 'VP Product', 'Product Analyst'],
  Design: ['UI Designer', 'UX Researcher', 'Design Lead', 'Creative Director'],
  Legal: ['Legal Counsel', 'Compliance Officer', 'Paralegal'],
  Support: ['Support Engineer', 'Customer Success Manager', 'Support Lead', 'Technical Writer'],
};

const firstNames = ['James','Mary','Robert','Patricia','John','Jennifer','Michael','Linda','David','Elizabeth','William','Barbara','Richard','Susan','Joseph','Jessica','Thomas','Sarah','Christopher','Karen','Daniel','Lisa','Matthew','Nancy','Anthony','Betty','Mark','Margaret','Donald','Sandra','Steven','Ashley','Andrew','Dorothy','Paul','Kimberly','Joshua','Emily','Kenneth','Donna','Kevin','Michelle','Brian','Carol','George','Amanda','Timothy','Melissa','Ronald','Deborah','Edward','Stephanie','Jason','Rebecca','Jeffrey','Sharon','Ryan','Laura','Jacob','Cynthia','Gary','Kathleen','Nicholas','Amy','Eric','Angela','Jonathan','Shirley','Stephen','Anna','Larry','Brenda','Justin','Pamela','Scott','Emma','Brandon','Nicole','Benjamin','Helen','Samuel','Samantha','Raymond','Katherine','Gregory','Christine','Frank','Debra','Alexander','Rachel','Patrick','Carolyn','Jack','Janet','Dennis','Catherine','Jerry','Maria','Tyler','Heather','Aaron','Diane'];
const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Gomez','Phillips','Evans','Turner','Diaz','Parker','Cruz','Edwards','Collins','Reyes','Stewart','Morris','Morales','Murphy','Cook','Rogers','Gutierrez','Ortiz','Morgan','Cooper','Peterson','Bailey','Reed','Kelly','Howard','Ramos','Kim','Cox','Ward','Richardson','Watson','Brooks','Chavez','Wood','James','Bennett','Gray','Mendoza','Ruiz','Hughes','Price','Alvarez','Castillo','Sanders','Patel','Myers','Long','Ross','Foster','Jimenez','Powell'];

const companyNames = [
  'TechNova Inc.','Quantum Solutions','DataForge Labs','CloudPeak Systems','NexGen Digital',
  'Vertex Analytics','Prism Technologies','Catalyst Corp','Horizon Software','Stellar Dynamics',
  'Apex Industries','Forge Innovations','Pulse Digital','Nimbus Tech','Synergy Labs',
  'Orbit Systems','Zenith Group','Atlas Ventures','Pixel Perfect','Radiant AI',
  'Momentum Corp','Fusion Works','Blueprint Tech','Summit Digital','Nova Enterprises',
  'Elevate Labs','Spark Solutions','Matrix Corp','Helix Systems','Cipher Tech',
  'Aurora Digital','Beacon Analytics','Pinnacle Software','Ember Technologies','Cascade Corp',
  'Velocity Labs','Stratos Inc.','Ionic Solutions','Vanguard Tech','Nexus Digital',
  'Quantum Leap Inc.','DataBridge Corp','CloudForge Systems','SkyNet Solutions','TerraBytes Inc.',
  'InfoPulse','CyberCore Labs','DigiWave Corp','SmartGrid Tech','GlobalConnect Inc.',
  'RapidScale','ByteForce Inc.','CodeStream Labs','DataVault Systems','NetSphere Corp'
];

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick<T>(arr: T[]): T { return arr[rand(0, arr.length - 1)]; }
function uuid() { return crypto.randomUUID ? crypto.randomUUID() : `${rand(1000,9999)}-${rand(1000,9999)}-${rand(1000,9999)}`; }

export type Company = {
  id: string; name: string; industry: string; employees: number; plan: string;
  mrr: number; status: 'active' | 'trial' | 'churned'; joinedDate: string; logo: string;
};

export type Employee = {
  id: string; name: string; email: string; department: string; position: string;
  salary: number; status: 'active' | 'on-leave' | 'terminated'; startDate: string;
  performance: number; avatar: string; companyId: string;
};

export type AttendanceRecord = {
  id: string; employeeId: string; date: string; checkIn: string; checkOut: string;
  status: 'present' | 'late' | 'absent' | 'half-day'; hoursWorked: number;
};

export type LeaveRequest = {
  id: string; employeeId: string; type: string; startDate: string; endDate: string;
  status: 'approved' | 'pending' | 'rejected'; reason: string; days: number;
};

export type Project = {
  id: string; name: string; status: 'active' | 'completed' | 'on-hold' | 'at-risk';
  progress: number; startDate: string; endDate: string; department: string;
  members: number; budget: number; spent: number;
};

export type Task = {
  id: string; title: string; projectId: string; assignee: string; status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical'; dueDate: string;
};

export type PayrollRecord = {
  id: string; employeeId: string; month: string; baseSalary: number; bonus: number;
  deductions: number; tax: number; netPay: number;
};

export type Candidate = {
  id: string; name: string; email: string; position: string; stage: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  score: number; appliedDate: string; source: string;
};

export type Ticket = {
  id: string; subject: string; status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high'; createdAt: string; category: string;
};

const industries = ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Manufacturing', 'Logistics', 'Media', 'Real Estate', 'SaaS'];
const plans = ['Starter', 'Professional', 'Enterprise'];

function generateCompanies(count: number): Company[] {
  return Array.from({ length: count }, (_, i) => ({
    id: uuid(),
    name: companyNames[i] || `Company ${i + 1}`,
    industry: pick(industries),
    employees: rand(50, 5000),
    plan: pick(plans),
    mrr: rand(500, 50000),
    status: pick(['active', 'active', 'active', 'trial', 'churned']) as Company['status'],
    joinedDate: `${2022 + rand(0, 3)}-${String(rand(1, 12)).padStart(2, '0')}-${String(rand(1, 28)).padStart(2, '0')}`,
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}`,
  }));
}

function generateEmployees(count: number, companyId: string): Employee[] {
  return Array.from({ length: count }, () => {
    const dept = pick(departments);
    const pos = pick(positions[dept as keyof typeof positions] || ['Associate']);
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    return {
      id: uuid(),
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@company.com`,
      department: dept,
      position: pos,
      salary: rand(45000, 220000),
      status: pick(['active', 'active', 'active', 'active', 'on-leave', 'terminated']) as Employee['status'],
      startDate: `${2019 + rand(0, 5)}-${String(rand(1, 12)).padStart(2, '0')}-${String(rand(1, 28)).padStart(2, '0')}`,
      performance: rand(40, 100),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fn}${ln}`,
      companyId,
    };
  });
}

function generateAttendance(employeeIds: string[], months: number): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const now = new Date();
  for (const empId of employeeIds.slice(0, 200)) {
    for (let m = 0; m < months; m++) {
      for (let d = 1; d <= 22; d++) {
        const date = new Date(now.getFullYear(), now.getMonth() - m, d);
        if (date > now || date.getDay() === 0 || date.getDay() === 6) continue;
        const status = pick(['present', 'present', 'present', 'present', 'present', 'late', 'absent', 'half-day']) as AttendanceRecord['status'];
        const checkInH = status === 'late' ? rand(9, 11) : rand(8, 9);
        const checkOutH = status === 'half-day' ? rand(12, 14) : rand(17, 19);
        records.push({
          id: uuid(),
          employeeId: empId,
          date: date.toISOString().split('T')[0],
          checkIn: `${String(checkInH).padStart(2, '0')}:${String(rand(0, 59)).padStart(2, '0')}`,
          checkOut: `${String(checkOutH).padStart(2, '0')}:${String(rand(0, 59)).padStart(2, '0')}`,
          status,
          hoursWorked: checkOutH - checkInH + Math.random(),
        });
      }
    }
  }
  return records;
}

function generateLeaves(employeeIds: string[]): LeaveRequest[] {
  const types = ['Annual Leave', 'Sick Leave', 'Personal', 'Maternity', 'Paternity', 'Bereavement'];
  const reasons = ['Family event', 'Medical appointment', 'Vacation', 'Personal matters', 'Not feeling well', 'Travel'];
  return Array.from({ length: Math.min(employeeIds.length, 300) }, (_, i) => {
    const days = rand(1, 14);
    return {
      id: uuid(),
      employeeId: employeeIds[i % employeeIds.length],
      type: pick(types),
      startDate: `2025-${String(rand(1, 12)).padStart(2, '0')}-${String(rand(1, 20)).padStart(2, '0')}`,
      endDate: `2025-${String(rand(1, 12)).padStart(2, '0')}-${String(rand(20, 28)).padStart(2, '0')}`,
      status: pick(['approved', 'approved', 'pending', 'rejected']) as LeaveRequest['status'],
      reason: pick(reasons),
      days,
    };
  });
}

const projectNames = [
  'Platform Redesign','API Gateway v2','Mobile App Launch','Data Pipeline','Cloud Migration',
  'Security Audit','Customer Portal','Analytics Dashboard','CI/CD Pipeline','Microservices Migration',
  'Payment Integration','Search Engine Optimization','Brand Refresh','Onboarding Flow','Performance Optimization',
  'AI Chatbot','Inventory System','CRM Integration','Notification Service','Multi-tenant Architecture',
  'SSO Implementation','Compliance Framework','Load Testing Suite','Documentation Portal','Feature Flagging',
];

function generateProjects(count: number): Project[] {
  return Array.from({ length: count }, (_, i) => {
    const budget = rand(50000, 500000);
    const progress = rand(5, 100);
    return {
      id: uuid(),
      name: projectNames[i % projectNames.length],
      status: progress === 100 ? 'completed' : progress < 20 ? pick(['active', 'on-hold']) : pick(['active', 'active', 'at-risk']) as Project['status'],
      progress,
      startDate: `2024-${String(rand(1, 12)).padStart(2, '0')}-01`,
      endDate: `2025-${String(rand(6, 12)).padStart(2, '0')}-28`,
      department: pick(departments),
      members: rand(3, 15),
      budget,
      spent: Math.floor(budget * (progress / 100) * (0.8 + Math.random() * 0.4)),
    };
  });
}

const taskTitles = [
  'Update API endpoints','Fix login bug','Write unit tests','Design landing page','Review PR #342',
  'Setup monitoring','Database optimization','Write documentation','Code review','Deploy to staging',
  'Fix responsive layout','Add error handling','Integrate webhook','Update dependencies','Performance testing',
  'Create user stories','Setup CI pipeline','Migrate database','Add analytics tracking','Security patch',
];

function generateTasks(count: number, projects: Project[], employees: Employee[]): Task[] {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    title: pick(taskTitles),
    projectId: pick(projects).id,
    assignee: pick(employees).name,
    status: pick(['todo', 'in-progress', 'review', 'done']) as Task['status'],
    priority: pick(['low', 'medium', 'medium', 'high', 'critical']) as Task['priority'],
    dueDate: `2025-${String(rand(4, 12)).padStart(2, '0')}-${String(rand(1, 28)).padStart(2, '0')}`,
  }));
}

function generatePayroll(employees: Employee[]): PayrollRecord[] {
  const records: PayrollRecord[] = [];
  const months = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'];
  for (const emp of employees.slice(0, 200)) {
    for (const month of months) {
      const bonus = Math.random() > 0.7 ? rand(1000, 10000) : 0;
      const deductions = rand(200, 1500);
      const tax = Math.floor(emp.salary / 12 * 0.22);
      records.push({
        id: uuid(),
        employeeId: emp.id,
        month,
        baseSalary: Math.floor(emp.salary / 12),
        bonus,
        deductions,
        tax,
        netPay: Math.floor(emp.salary / 12) + bonus - deductions - tax,
      });
    }
  }
  return records;
}

function generateCandidates(count: number): Candidate[] {
  const sources = ['LinkedIn', 'Indeed', 'Referral', 'Company Website', 'AngelList', 'Glassdoor'];
  return Array.from({ length: count }, () => {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const dept = pick(departments);
    return {
      id: uuid(),
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@email.com`,
      position: pick(positions[dept as keyof typeof positions] || ['Associate']),
      stage: pick(['applied', 'screening', 'interview', 'offer', 'hired', 'rejected']) as Candidate['stage'],
      score: rand(30, 98),
      appliedDate: `2025-${String(rand(1, 4)).padStart(2, '0')}-${String(rand(1, 28)).padStart(2, '0')}`,
      source: pick(sources),
    };
  });
}

function generateTickets(count: number): Ticket[] {
  const subjects = ['Login issue', 'Cannot export data', 'Payroll discrepancy', 'Permission error', 'Slow loading', 'Feature request', 'Integration broken', 'Account locked', 'Report generation failed', 'SSO not working'];
  const categories = ['Authentication', 'Data', 'Billing', 'Performance', 'Feature', 'Bug'];
  return Array.from({ length: count }, () => ({
    id: uuid(),
    subject: pick(subjects),
    status: pick(['open', 'in-progress', 'resolved', 'closed']) as Ticket['status'],
    priority: pick(['low', 'medium', 'high']) as Ticket['priority'],
    createdAt: `2025-${String(rand(1, 4)).padStart(2, '0')}-${String(rand(1, 28)).padStart(2, '0')}`,
    category: pick(categories),
  }));
}

// Revenue data for charts
export function getRevenueData() {
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((m, i) => ({
    month: m,
    revenue: 120000 + i * 15000 + rand(-5000, 5000),
    expenses: 80000 + i * 8000 + rand(-3000, 3000),
    profit: 40000 + i * 7000 + rand(-2000, 2000),
  }));
}

export function getDepartmentData() {
  return departments.slice(0, 7).map(d => ({
    name: d,
    headcount: rand(20, 200),
    avgPerformance: rand(60, 95),
    budget: rand(200000, 2000000),
    attrition: rand(2, 18),
  }));
}

export function getAttendanceTrend() {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => ({
    day,
    onTime: rand(75, 95),
    late: rand(3, 15),
    absent: rand(2, 10),
  }));
}

export function getMonthlyHiring() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(m => ({
    month: m,
    applications: rand(80, 300),
    interviews: rand(20, 80),
    hired: rand(5, 25),
  }));
}

export function getPerformanceDistribution() {
  return [
    { range: '90-100', count: rand(30, 80), fill: 'hsl(var(--chart-1))' },
    { range: '80-89', count: rand(60, 150), fill: 'hsl(var(--chart-2))' },
    { range: '70-79', count: rand(80, 200), fill: 'hsl(var(--chart-3))' },
    { range: '60-69', count: rand(40, 100), fill: 'hsl(var(--chart-4))' },
    { range: 'Below 60', count: rand(10, 40), fill: 'hsl(var(--chart-5))' },
  ];
}

export function getSalaryDistribution() {
  return departments.slice(0, 6).map(d => ({
    department: d.slice(0, 3),
    min: rand(45000, 65000),
    avg: rand(85000, 130000),
    max: rand(150000, 250000),
  }));
}

// Generate the data
export const companies = generateCompanies(55);
export const employees = generateEmployees(500, companies[0].id);
export const attendance = generateAttendance(employees.map(e => e.id), 6);
export const leaves = generateLeaves(employees.map(e => e.id));
export const projects = generateProjects(25);
export const tasks = generateTasks(200, projects, employees);
export const payroll = generatePayroll(employees);
export const candidates = generateCandidates(150);
export const tickets = generateTickets(80);

// Summary stats
export const platformStats = {
  totalCompanies: companies.length,
  totalEmployees: companies.reduce((s, c) => s + c.employees, 0),
  totalRevenue: companies.reduce((s, c) => s + c.mrr, 0),
  activeCompanies: companies.filter(c => c.status === 'active').length,
  trialCompanies: companies.filter(c => c.status === 'trial').length,
  churnedCompanies: companies.filter(c => c.status === 'churned').length,
  avgMRR: Math.floor(companies.reduce((s, c) => s + c.mrr, 0) / companies.length),
  arr: companies.reduce((s, c) => s + c.mrr, 0) * 12,
};

export const companyStats = {
  totalEmployees: employees.length,
  activeEmployees: employees.filter(e => e.status === 'active').length,
  onLeave: employees.filter(e => e.status === 'on-leave').length,
  avgPerformance: Math.floor(employees.reduce((s, e) => s + e.performance, 0) / employees.length),
  attendanceRate: 92.4,
  activeProjects: projects.filter(p => p.status === 'active').length,
  totalPayroll: Math.floor(employees.reduce((s, e) => s + e.salary, 0) / 12),
  openPositions: 23,
  pendingLeaves: leaves.filter(l => l.status === 'pending').length,
  openTickets: tickets.filter(t => t.status === 'open').length,
};
