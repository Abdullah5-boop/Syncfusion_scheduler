
import {
    ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
    Inject, ResourcesDirective, ResourceDirective,
    TimelineViews, TimelineMonth, DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';
import { useState } from 'react';
import AddEventPopup from '../Popup/AddEventPopup';
import CellTempleteOne from '../CellTemplete/CellTempleteOne';
import { appointmentDatas ,  appointmentData} from '../Other/MakeAppointment';
// import { BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';

const special = [
    {
        date: new Date(2026, 11, 16), // Dec 16, 2025
        startTime: new Date(2026, 11, 16, 8, 0),
        endTime: new Date(2026, 11, 16, 10, 0),
        isWorking: true,
        text: 'Public Holiday',
        cssClass: 'dec-16-holiday-cell'
    },
    {
        date: new Date(2026, 11, 20), // Dec 16, 2025
        startTime: new Date(2026, 11, 20, 8, 0),
        endTime: new Date(2026, 11, 20, 12, 0),
        isWorking: true,
        text: 'nothing ',
        cssClass: 'dec-16-holiday-cell'
    },


]
let resourceDataSourceSecondLayer = [
    { Name: "Room 1", Id: 1, Color: "#1abc9c" },
    { Name: "Room 2", Id: 2, Color: "#3498db" },
    { Name: "Room 3", Id: 3, Color: "#9b59b6" },
    { Name: "Room 4", Id: 4, Color: "#b2be05ff" }
];

let resourceDataSourceFirstLayer = [
    { Name: "A-1", Id: 1, Color: "#bc1a1aff", GroupId: 1 },
    { Name: "A-2", Id: 2, Color: "#bc1a1aff", GroupId: 1 },
    { Name: "B-1", Id: 3, Color: "#77f807ff", GroupId: 2 },
    { Name: "B-2", Id: 4, Color: "#77f807ff", GroupId: 2 },
    { Name: "c-1", Id: 5, Color: "#e67e22", GroupId: 3 },
    { Name: "B-4", Id: 6, Color: "#c3116aff", GroupId: 4 },
    { Name: "B-5", Id: 7, Color: "#c3116aff", GroupId: 4 }
];



// const appointmentData = [
//     // Multi-day event (Dec 17–19)
//     {
//         Id: 1,
//         Subject: 'Abdullah',
//         StartTime: new Date(2025, 11, 15, 9, 0),
//         EndTime: new Date(2025, 11, 17, 11, 0),
//         ResourceId: 2, //room  { Name: "B-2", Id: 4, Color: "#77f807ff", GroupId: 2 },
//         GroupId: 4 //a2
//     },

//     // Single-day meetings (Dec 20)
//     {
//         Id: 2,
//         Subject: 'Client Interview (Internal)',
//         StartTime: new Date(2025, 11, 18, 10, 0),
//         EndTime: new Date(2025, 11, 19, 13, 0),
//         ResourceId: 2,
//         GroupId: 3
//     },

//     {
//         Id: 3,
//         Subject: 'Tech Demo',
//         StartTime: new Date(2025, 11, 20, 11, 0),
//         EndTime: new Date(2025, 11, 21, 12, 0),
//         ResourceId: 3,
//         GroupId: 2
//     },


// ];









// 
const DataFetch = (arg) => {

}
const EventClicked = (arg) => {
    console.log("Event clike line 105 -> ", arg);
}



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




function Scheduler() {
    const [showPopup, setShowPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const onPopupOpen = (args) => {
        // Cancel default editor
        if (args.type === "QuickInfo") {
            // args.cancel = true;
        }
        console.log("onPopupOpen args -> ", args);
    };
    const newPopupOpen = (args) => {
        return (<AddEventPopup args={args}></AddEventPopup>)

    }

    console.log("Scheduler component rendered ", showPopup);
    return (
        <>
            <ScheduleComponent
                //    editorTemplate={newPopupOpen}
                // editorTemplate={editorTemplate}
                popupOpen={onPopupOpen}
                // editorTemplate={AddEventPopup}
                cssClass='schedule-cell-dimension'
                actionBegin={onActionBegin}
                // popupOpen={disableDefaultEditor}
                width="100%"
                height="550px"

                rowAutoHeight={true}
                eventClick={EventClicked}
                eventSettings={{ dataSource: appointmentData }}
                group={{ resources: ['Resources', 'Group'] }}
                views={[
                    "Day",
                    "Week",
                    "WorkWeek",
                    "Month",
                    "Agenda",
                    { option: "TimelineDay" },
                    { option: "TimelineWeek" },
                    {
                        option: "TimelineWorkWeek",
                        interval: 4,
                        showWeekend: false,

                        startHour: "08:00",
                        endHour: "14:00",
                        timeScale: {
                            enable: true,
                            interval: 140,
                            slotCount: 3,
                        }

                    },
                    { option: "TimelineMonth", showWeekend: false }

                ]}
                currentView="TimelineMonth"
                allowDragAndDrop={true}
                allowResizing={true}
                //  cellTemplate={<CellTempleteOne></CellTempleteOne>}
                renderCell={CellTempleteOne}


            >
                <ResourcesDirective >
                    <ResourceDirective

                        field="ResourceId"        // <-- MUST match appointmentData field
                        title="Rooms / Labs"
                        name="Resources"          // <-- used internally for binding
                        allowMultiple={true}
                        dataSource={resourceDataSourceSecondLayer}
                        textField="Name"          // <-- must match resourceDataSource keys
                        idField="Id"
                        colorField="Color"
                    />


                    <ResourceDirective
                        textField='Name'
                        idField='Id'
                        colorField='Color'
                        groupIDField='GroupId'
                        allowMultiple={true}
                        field='GroupId'
                        name='Group'
                        title='Group Title'
                        dataSource={resourceDataSourceFirstLayer}
                    >

                    </ResourceDirective>
                </ResourcesDirective>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, TimelineViews, TimelineMonth, DragAndDrop, Resize]} />

            </ScheduleComponent>
        </>
    );
}

export default Scheduler;