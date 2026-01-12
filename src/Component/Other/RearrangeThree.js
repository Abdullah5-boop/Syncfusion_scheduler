function setNewDate(startTime, args, duration) {
    let newStart = new Date(startTime);
    let newEnd = new Date(newStart.getTime() + duration);
    console.log("newStart -> ", newStart, " newEnd -> ", newEnd);
    args.data.StartTime = newStart;
    args.data.EndTime = newEnd;

}



function RearrangeThree(args, appointmentData, oldData) {
    let oldEventData = oldData?.activeEventData?.event;
    let newEventData = args.data;
    let newStart = new Date(newEventData.StartTime);
    let newEnd = new Date(newEventData.EndTime);
    let duration = newEnd.getTime() - newStart.getTime();
    console.log("oldEventData -> ", duration);
    //match appointment with same date
    let matchAppointment = appointmentData.filter(app => {
        let startDate = new Date(app.StartTime);
        let endDate = new Date(app.EndTime);

        return (app.GroupId === newEventData.GroupId &&
            app.ResourceId === newEventData.ResourceId &&
            startDate.getFullYear() === newStart.getFullYear() &&
            startDate.getMonth() === newStart.getMonth() &&
            startDate.getDate() === newStart.getDate()
            // Check for time overlap
        );


    })
    if (matchAppointment.length == 0) {
        // match appointment with same end date
        let matchEndDateAppointment = appointmentData.filter(app => {
            let endDate = new Date(app.EndTime);
            return (app.GroupId === newEventData.GroupId &&
                app.ResourceId === newEventData.ResourceId &&
                endDate.getFullYear() === newEnd.getFullYear() &&
                endDate.getMonth() === newEnd.getMonth() &&
                endDate.getDate() === newEnd.getDate()
            );

        })


        if (matchEndDateAppointment.length !== 0) {
            let lastAppointment = new Date(matchEndDateAppointment[matchEndDateAppointment.length - 1].EndTime);
            console.log("lastAppointmentc end time -> ", lastAppointment);
            setNewDate(lastAppointment, args, duration);

        }
        else
        // match end and start date is not found
        {
            let oldStartData = new Date(oldEventData.StartTime);
            let newDatemake = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate(), oldStartData.getHours(), oldStartData.getMinutes(), oldStartData.getSeconds());

            console.log("newDatemake -> ", newDatemake);

            // let oldEndData = new Date(oldEventData.EndTime);
            setNewDate(newDatemake, args, duration);

        }




    }
    else {
      
        //conflict found, set appointment after last appointment
        let lastAppointment = new Date(matchAppointment[matchAppointment.length - 1].EndTime);
        console.log("lastAppointmentc end time -> ", lastAppointment);
        console.log("match -> ", matchAppointment);
        args.data.StartTime = new Date(lastAppointment);
        args.data.EndTime = new Date(lastAppointment.getTime() + duration);
        // setNewDate(lastAppointment, args, duration);
    }




    console.log("matchAppointment -> ", matchAppointment);


}

export default RearrangeThree;
