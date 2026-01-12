// function Rearranging(args, appointmentData, oldData,) {
//     let oldEventData = oldData?.activeEventData?.event;
//     let newEventData = args.data;

//     console.log("old data-> ", oldData?.activeEventData.event);
//     console.log("new data-> ", args.data);

//     if (args.requestType === 'eventChange') {
//         let oldElStart = oldEventData ? new Date(oldEventData.StartTime) : undefined;
//         let oldElEnd = oldEventData ? new Date(oldEventData.EndTime) : undefined;

//         console.log(`Old Start: ${oldElStart} | Old End: ${oldElEnd} \n 
//             New Start: ${newEventData.StartTime} | New End: ${newEventData.EndTime}`);


//         let appointmentsSameDay = appointmentData.filter(app => {
//             let appStart = new Date(app.StartTime);
//             let newStart = new Date(newEventData.StartTime);
//             return app.GroupId === newEventData.GroupId &&
//                 app.ResourceId === newEventData.ResourceId &&
//                 appStart.getFullYear() === newStart.getFullYear() &&
//                 appStart.getMonth() === newStart.getMonth() &&
//                 appStart.getDate() === newStart.getDate();
//         })
//         console.log("appointmentsSameDay -> ", appointmentsSameDay);



//         if (oldElStart && oldElEnd && appointmentsSameDay.length == 0) {
//             let newSt = new Date(newEventData.StartTime);
//             let newEd = new Date(newEventData.EndTime);

//             // Correct merge: new date + old time
//             let updatedSt = new Date(
//                 newSt.getFullYear(),
//                 newSt.getMonth(),
//                 newSt.getDate(),
//                 oldElStart.getHours(),
//                 oldElStart.getMinutes(),
//                 oldElStart.getSeconds()
//             );

//             let updatedEd = new Date(
//                 newEd.getFullYear(),
//                 newEd.getMonth(),
//                 newEd.getDate(),
//                 oldElEnd.getHours(),
//                 oldElEnd.getMinutes(),
//                 oldElEnd.getSeconds()
//             );

//             console.log(`Updated Start: ${updatedSt} | Updated End: ${updatedEd}`);

//             // Assign back to args.data so Syncfusion uses it
//             args.data.StartTime = updatedSt;
//             args.data.EndTime = updatedEd;
//         }
//         else if (appointmentsSameDay.length > 0) {
//             let sortedApps = appointmentsSameDay.sort(
//                 (a, b) => new Date(a.StartTime) - new Date(b.StartTime)
//             );
//             console.log("sortedApps -> ", sortedApps);
//             let lastAppSt = sortedApps[sortedApps.length - 1].StartTime;
//             args.data.StartTime = new Date(lastAppSt);
//             let durationMs = oldElEnd - oldElStart;

//             args.data.EndTime = new Date(new Date(lastAppSt).getTime() + durationMs);

//         }
//     }
// }






// export default Rearranging;




























const WORK_START_HOUR = 8;
const WORK_END_HOUR = 16;

/* ------------------ Helpers ------------------ */

function setToWorkStart(date) {
    let d = new Date(date);
    d.setHours(WORK_START_HOUR, 0, 0, 0);
    return d;
}

function setToWorkEnd(date) {
    let d = new Date(date);
    d.setHours(WORK_END_HOUR, 0, 0, 0);
    return d;
}

function nextWorkingDay(date) {
    let d = new Date(date);
    d.setDate(d.getDate() + 1);
    return setToWorkStart(d);
}

function calculateEndTime(startTime, durationMs) {
    let current = new Date(startTime);
    let remaining = durationMs;

    while (remaining > 0) {
        let workEnd = setToWorkEnd(current);
        let availableToday = workEnd - current;

        if (remaining <= availableToday) {
            return new Date(current.getTime() + remaining);
        }

        remaining -= availableToday;
        current = nextWorkingDay(current);
    }
}

/* ------------------ Main ------------------ */

function Rearranging(args, appointmentData, oldData,setPopupActionStatus, popupActionStatus) {


    let oldEventData = oldData?.activeEventData?.event;
    let newEventData = args.data;
    console.log("_".repeat(30))
    console.log({ oldData, newEventData, arg: args });
    console.log("_".repeat(30))
    if (!oldEventData) return;

    let oldElStart = new Date(oldEventData.StartTime);
    let oldElEnd = new Date(oldEventData.EndTime);
    let durationMs = oldElEnd - oldElStart;

    let newStartDate = new Date(newEventData.StartTime);

    /* ---- same-day appointments ---- */
    let appointmentsSameDay = appointmentData.filter(app => {
        let appStart = new Date(app.StartTime);
        return (
            app.GroupId === newEventData.GroupId &&
            app.ResourceId === newEventData.ResourceId &&
            appStart.getFullYear() === newStartDate.getFullYear() &&
            appStart.getMonth() === newStartDate.getMonth() &&
            appStart.getDate() === newStartDate.getDate() &&
            app.Id !== newEventData.Id
        );
    });

    /* ---------- CASE 1: NO SAME DAY EVENTS ---------- */
    if (appointmentsSameDay.length === 0) {
        let start = new Date(
            newStartDate.getFullYear(),
            newStartDate.getMonth(),
            newStartDate.getDate(),
            oldElStart.getHours(),
            oldElStart.getMinutes(),
            0
        );

        if (start.getHours() < WORK_START_HOUR) {
            start = setToWorkStart(start);
        }

        if (start.getHours() >= WORK_END_HOUR) {
            start = nextWorkingDay(start);
        }

        args.data.StartTime = start;
        args.data.EndTime = calculateEndTime(start, durationMs);
        return;
    }

    /* ---------- CASE 2: SAME DAY EVENTS EXIST ---------- */
    let sortedApps = appointmentsSameDay.sort(
        (a, b) => new Date(a.EndTime) - new Date(b.EndTime)
    );

    let lastAppEnd = new Date(sortedApps[sortedApps.length - 1].EndTime);

    if (lastAppEnd.getHours() >= WORK_END_HOUR) {
        lastAppEnd = nextWorkingDay(lastAppEnd);
    }

    args.data.StartTime = lastAppEnd;
    args.data.EndTime = calculateEndTime(lastAppEnd, durationMs);
}

export default Rearranging;
