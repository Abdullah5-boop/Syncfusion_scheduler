function Rearranging(args, appointmentData) {
    console.log("selected el -> ", args);

    if (args.requestType === 'eventChange') {
        const data = args.data;
        const dataStartDate = new Date(data.StartTime);
        const dataEndDate = new Date(data.EndTime);
        const diffMs = dataEndDate - dataStartDate; // duration in ms

        // console.log("Duration in ms ->", diffMs);

        // Filter appointments for same GroupId, ResourceId, and same day
        const sameDayAppointments = appointmentData.filter(app =>
            app.GroupId === data.GroupId &&
            app.ResourceId === data.ResourceId &&
            new Date(app.StartTime).getFullYear() === dataStartDate.getFullYear() &&
            new Date(app.StartTime).getMonth() === dataStartDate.getMonth() &&
            new Date(app.StartTime).getDate() === dataStartDate.getDate()
        );
        console.log("sameDayAppointments -> ", sameDayAppointments)
        // Sort by StartTime
        const sortedApp = sameDayAppointments.sort(
            (a, b) => new Date(a.StartTime) - new Date(b.StartTime)
        );
        console.log("sortedApp -> ", sortedApp)

        if (sameDayAppointments.length === 0) return ;

        if (sortedApp.length !== 0) {


            console.log("sortedApp.length !== 0 -> ", sortedApp)

            // Set new StartTime to the EndTime of the last appointment
            const lastAppointmentEnd = new Date(sortedApp[sortedApp.length - 1].EndTime);
            args.data.StartTime = lastAppointmentEnd;

            // Set EndTime based on original duration
            args.data.EndTime = new Date(lastAppointmentEnd.getTime() + diffMs);
        }

        console.log("_".repeat(30));
        console.log({ data, appointmentData, sameDayAppointments, sortedApp });
        console.log("_".repeat(30));
    }
}

export default Rearranging;
