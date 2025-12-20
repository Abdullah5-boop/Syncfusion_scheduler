const company = [
    {
        co_id: 1,
        total_working_hour: 10,
        start_date: new Date(2025, 11, 2, 8, 0), // 08:00
        working_hour_start: 8,
        holiday: [5, 0]
    },
    {
        co_id: 1,
        total_working_hour: 9,
        start_date: new Date(2025, 9, 9, 7, 0), // 08:00
        working_hour_start: 8,
        holiday: [5, 0]
    },
    {
        co_id: 1,
        total_working_hour: 8,
        start_date: new Date(2025, 8, 1, 6, 0), // 08:00
        working_hour_start: 8,
        holiday: [5, 0]
    },
    {
        co_id: 2,
        total_working_hour: 8,
        start_date: new Date(2025, 10, 1, 8, 0), // 08:00
        working_hour_start: 8,
        holiday: [5, 0]
    }
];
const appointmentDatas = [
    // Multi-day event (Dec 17–19)
    {
        Id: 1,
        co_id: 1,
        Subject: 'Abdullah',
        StartTime: new Date(2025, 11, 15, 9, 0),
        EndTime: new Date(2025, 11, 17, 11, 0),
        ResourceId: 2,
        //room  { Name: "B-2", Id: 4, Color: "#77f807ff", GroupId: 2 },
        GroupId: 4 //a2
    },

    // Single-day meetings (Dec 20)
    {
        Id: 2,
        Subject: 'Client Interview (Internal)',
        StartTime: new Date(2025, 11, 18, 10, 0),
        EndTime: new Date(2025, 11, 19, 13, 0),
        ResourceId: 2,
        GroupId: 3
    },

    {
        Id: 3,
        Subject: 'Tech Demo',
        StartTime: new Date(2025, 11, 20, 11, 0),
        EndTime: new Date(2025, 11, 21, 12, 0),
        ResourceId: 3,
        GroupId: 2
    },


];
const appointmentData = [
    {
        Id: 1,
        co_id: 1,
        Subject: "Abdullah",
        StartTime: new Date(2025, 11, 15),
        EndTime: new Date(2025, 11, 17),
        duration: 2.6,
        start_th_hour: 3,
        end_th_hour: 5,
        ResourceId: 2,
        GroupId: 3
    },
    {
        Id: 2,
        co_id: 2,
        Subject: "Rahim",
        StartTime: new Date(2025, 10, 16),
        EndTime: new Date(2025, 10, 20),
        duration: 1.5,
        start_th_hour: 1,
        end_th_hour: 5,
        ResourceId: 2,
        //room  { Name: "B-2", Id: 4, Color: "#77f807ff", GroupId: 2 },
        GroupId: 4 //a2
    },
    {
        Id: 3,
        co_id: 1,
        Subject: "Rahim",
        StartTime: new Date(2025, 11, 18),
        EndTime: new Date(2025, 11, 20),
        duration: 1.5,
        start_th_hour: 2,
        end_th_hour: 5,
        ResourceId: 2,
        GroupId: 3
    }
];


function get_month(date) {
    return new Date(date).getMonth(); // 0-based
}

function addHours(date, hours) {
    const d = new Date(date);
    d.setTime(d.getTime() + hours * 60 * 60 * 1000);
    return d;
}
function calculate_th_date_hour(
    company_start_date, // time source (08:00)
    start_th_hour,      // task hour index
    program_start_date  // date source
) {
    const result = new Date(program_start_date);
    const baseTime = new Date(company_start_date);

    const hourOffset = start_th_hour - 1;

    result.setHours(
        baseTime.getHours() + hourOffset,
        baseTime.getMinutes(),
        0,
        0
    );

    return result;
}
function dateHandle(data) {
    const find_company = company.find(
        com =>
            com.co_id === data.co_id &&
            get_month(data.StartTime) === get_month(com.start_date)
    );

    if (!find_company) return null;

    const startTimeWithDate = calculate_th_date_hour(
        find_company.start_date,
        data.start_th_hour,
        data.StartTime

    );

    const endTimeWithDate = calculate_th_date_hour(
        find_company.start_date,
        data.end_th_hour,
        data.EndTime


    )


    return { startTimeWithDate, endTimeWithDate };
}
const AppointmentDataUpdate = appointmentData.map(el => {
    const result = dateHandle(el);
    if (!result) return null
    if (result) {

        return {
            ...el,
            StartTime: new Date( result.startTimeWithDate),
            EndTime: new Date( result.endTimeWithDate)
        };
    }
}).filter(Boolean);


console.log("_".repeat(50))
console.log("AppointmentDataUpdate")
console.log(AppointmentDataUpdate)
console.log(appointmentDatas)
console.log("_".repeat(50))


export { appointmentDatas, AppointmentDataUpdate as appointmentData};