const onActionBegin = (args) => {
    let specialDayConfictState = false;
    if (args.requestType === "eventCreate" || args.requestType === "eventChange") {
        const eventData = Array.isArray(args.data) ? args.data[0] : args.data;

        console.log("onActionBegin -> ", eventData);


        let startTime = new Date(eventData.StartTime);
        let endTime = new Date(eventData.EndTime);
        let resourceId = eventData.ResourceId;

        const conflictEvent = appointmentData.find(evt => {
            if (evt.Id === eventData.Id) return false;  // ignore same event on update
            if (evt.ResourceId !== resourceId) return false;

            const evtStart = new Date(evt.StartTime);
            const evtEnd = new Date(evt.EndTime);

            // overlap condition
            return startTime < evtEnd && endTime > evtStart;
        });
        let dateMatch = "dateMatch";
        let timematch = "timematch";



        const es = new Date(eventData.StartTime)
        const ee = new Date(eventData.EndTime)
        function isSameDay(d1, d2) {
            let data =
                d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate()
            console.log("isSameDay data -> ", data);
            return data ? "dateMatchDone" : "dataMatchFail";

        }
        function specialNotification(NotificationclassName) {
            let form = document.querySelector(`.${NotificationclassName}`);
            let errorMsg = document.createElement("div");
            errorMsg.innerHTML = "Scheduling conflict with special working hours!";
            errorMsg.style.color = "red";
            errorMsg.style.fontWeight = "bold";
            if (form) form.appendChild(errorMsg);
            // return errorMsg;
        }
        function isWithinWorkingHours() {

            special.forEach(s => {
                let dateCheck = isSameDay(es, s.date);
                console.log("dateCheck -> ", dateCheck);

                if (dateCheck == "dateMatchDone") {
                    if (
                        es.getTime() >= s.startTime.getTime() &&
                        ee.getTime() <= s.endTime.getTime()
                    ) {

                        console.log("date and time match ");
                        return "dateAndTimeMatch";
                    } else {
                        args.cancel = true;
                        specialNotification("e-title-text")
                        console.log("date match but time not match ");
                        confirm("Scheduling conflict with special working hours!");
                        return "DateMatchTimeNotMatch";

                    }
                } else {
                    console.log("date not match ");
                    return "dateNotMatch";
                }
            })



            // for (const s of special) {
            //     let dateCheck = isSameDay(es, s.date);
            //     if (dateCheck === "dateMatchDone") {
            //         if (
            //             es.getTime() >= s.startTime.getTime() &&
            //             ee.getTime() <= s.endTime.getTime()
            //         ) 
            //         { return "dateAndTimeMatch";

            //          }
            //         else {
            //             return "DatetimeNotMatch";
            //         }
            //     }
            //     else return "dateNotMatch";


            //     // if (isSameDay(es, s.date)) {
            //     //     if (
            //     //         es.getTime() >= s.startTime.getTime() &&
            //     //         ee.getTime() <= s.endTime.getTime()
            //     //     ) { return true; }
            //     //     else return false;
            //     // }
            //     // else return false;


            // }
            // return "loop does not work";
        }

        console.log("_".repeat(20), "\n", "map function");
        console.log(special.map(s => isSameDay(s.startTime, es)));

        // let dateStatus = isWithinWorkingHours();
        // console.log("*_".repeat(20), "\n");
        // console.log("dateStatus -> ", dateStatus);

        console.log("_".repeat(20), "\n");


        console.log("_".repeat(20), "\n", "foreach function");
        console.log(isWithinWorkingHours());
        console.log("_".repeat(20), "\n");



        if (conflictEvent) {
            console.log("❌ Conflict detected with event:", conflictEvent);

            let comp = document.querySelector(".e-title-text");
            console.log("comp -> ", comp);
            let newTitle = document.createElement("div");
            newTitle.innerHTML = "Conflict detected with event: " + conflictEvent.Subject;
            newTitle.style.color = "red";
            newTitle.style.fontWeight = "bold";
            if (comp) {
                args.cancel = true;
                comp.appendChild(newTitle);

            }
            if (form) form.appendChild(errorMsg);

            return;
        }

        console.log("✅ No conflict. Event can be created.");
    }


};
export default onActionBegin