 const scheduleData = [
  {
    Id: 1,
    Subject: "Project Kickoff",
    StartTime: new Date("2025-01-10T10:00:00"),
    EndTime: new Date("2025-01-10T12:00:00"),
    children: [
      { id: "1-1", note: "Prepare slides" },
      { id: "1-2", note: "Send meeting invite" }
    ]
  },
  {
    Id: 2,
    Subject: "Design Review",
    StartTime: new Date("2025-01-11T14:00:00"),
    EndTime: new Date("2025-01-11T16:00:00"),
    children: [
      { id: "2-1", note: "UI review" },
      { id: "2-2", note: "UX updates" }
    ]
  },
  {
    Id: 3,
    Subject: "Requirement Discussion",
    StartTime: new Date("2025-01-12T09:30:00"),
    EndTime: new Date("2025-01-12T11:00:00"),
    children: [
      { id: "3-1", note: "Confirm feature list" }
    ]
  },
  {
    Id: 4,
    Subject: "Team Standup Meeting",
    StartTime: new Date("2025-01-13T10:00:00"),
    EndTime: new Date("2025-01-13T10:30:00"),
    children: [
      { id: "4-1", note: "Daily progress update" }
    ]
  },
  {
    Id: 5,
    Subject: "API Architecture Planning",
    StartTime: new Date("2025-01-13T15:00:00"),
    EndTime: new Date("2025-01-13T17:00:00"),
    children: [
      { id: "5-1", note: "Review endpoints" },
      { id: "5-2", note: "Define schemas" }
    ]
  },
  {
    Id: 6,
    Subject: "Client Meeting",
    StartTime: new Date("2025-01-14T11:00:00"),
    EndTime: new Date("2025-01-14T12:00:00"),
    children: [
      { id: "6-1", note: "Clarify requirements" }
    ]
  },
  {
    Id: 7,
    Subject: "Backend Development",
    StartTime: new Date("2025-01-15T09:00:00"),
    EndTime: new Date("2025-01-15T13:00:00"),
    children: [
      { id: "7-1", note: "Write controllers" },
      { id: "7-2", note: "Add middleware" }
    ]
  },
  {
    Id: 8,
    Subject: "Frontend Component Build",
    StartTime: new Date("2025-01-16T13:00:00"),
    EndTime: new Date("2025-01-16T17:00:00"),
    children: [
      { id: "8-1", note: "Build UI components" }
    ]
  },
  {
    Id: 9,
    Subject: "Testing Session",
    StartTime: new Date("2025-01-17T10:00:00"),
    EndTime: new Date("2025-01-17T12:00:00"),
    children: [
      { id: "9-1", note: "Write test cases" },
      { id: "9-2", note: "Run unit tests" },
      { id: "9-3", note: "Fix bugs" }
    ]
  },
  {
    Id: 10,
    Subject: "Deployment Planning",
    StartTime: new Date("2025-01-18T14:00:00"),
    EndTime: new Date("2025-01-18T16:00:00"),
    children: [
      { id: "10-1", note: "Prepare CI/CD" },
      { id: "10-2", note: "Server setup" }
    ]
  }
];
export  default scheduleData