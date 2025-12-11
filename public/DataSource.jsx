const DataSource = [
  {
    id: 1,
    name: "Project Planning",
    status: "In Progress",
    startDate: "2025-01-01",
    endDate: "2025-01-10",
    children: [
      { id: 11, name: "Requirement Gathering", status: "Done" }
    ]
  },
  {
    id: 2,
    name: "UI/UX Design",
    status: "Pending",
    startDate: "2025-01-05",
    endDate: "2025-01-15",
    children: [
      { id: 21, name: "Wireframes", status: "Pending" },
      { id: 22, name: "Wireframes Copy", status: "Pending" }, // fixed duplicate
      { id: 23, name: "Prototype", status: "Pending" }
    ]
  },
  {
    id: 3,
    name: "Frontend Development",
    status: "In Progress",
    startDate: "2025-01-10",
    endDate: "2025-02-10",
    children: [
      { id: 31, name: "Login Module", status: "Done" },
      { id: 32, name: "Dashboard UI", status: "In Progress" }
    ]
  },
  {
    id: 4,
    name: "Backend Development",
    status: "In Progress",
    startDate: "2025-01-12",
    endDate: "2025-02-20",
    children: [
      { id: 41, name: "API Setup", status: "Done" },
      { id: 42, name: "Authentication Service", status: "In Progress" }
    ]
  },
  {
    id: 5,
    name: "Database Setup",
    status: "Done",
    startDate: "2025-01-08",
    endDate: "2025-01-18",
    children: [
      { id: 51, name: "Schema Design", status: "Done" },
      { id: 52, name: "Migration Setup", status: "Done" }
    ]
  },
  {
    id: 6,
    name: "Testing",
    status: "Pending",
    startDate: "2025-02-01",
    endDate: "2025-02-25",
    children: [
      { id: 61, name: "Unit Testing", status: "Pending" },
      { id: 62, name: "Integration Testing", status: "Pending" }
    ]
  },
  {
    id: 7,
    name: "Deployment",
    status: "Pending",
    startDate: "2025-02-20",
    endDate: "2025-02-28",
    children: [
      { id: 71, name: "Staging Deployment", status: "Pending" },
      { id: 72, name: "Production Deployment", status: "Pending" }
    ]
  },
  {
    id: 8,
    name: "Documentation",
    status: "In Progress",
    startDate: "2025-02-05",
    endDate: "2025-02-18",
    children: [
      { id: 81, name: "API Docs", status: "In Progress" },
      { id: 82, name: "User Manual", status: "Pending" }
    ]
  },
  {
    id: 9,
    name: "Security Review",
    status: "Pending",
    startDate: "2025-02-15",
    endDate: "2025-02-22",
    children: [
      { id: 91, name: "Vulnerability Scan", status: "Pending" },
      { id: 92, name: "Pen Testing", status: "Pending" }
    ]
  },
  {
    id: 10,
    name: "Client Approval",
    status: "Pending",
    startDate: "2025-02-25",
    endDate: "2025-02-28",
    children: [
      { id: 101, name: "Review Meeting", status: "Pending" },
      { id: 102, name: "Final Sign-off", status: "Pending" }
    ]
  }
];

export default DataSource;
