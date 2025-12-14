
import {
    ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
    Inject, ResourcesDirective, ResourceDirective,
    TimelineViews, TimelineMonth, DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';
// import { BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';


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
    { Name: "B-4", Id: 7, Color: "#c3116aff", GroupId: 4 }
];

const appointmentData = [
    // Multi-day event (Dec 17–19)
    {
        Id: 1,
        Subject: 'Abdullah',
        StartTime: new Date(2025, 11, 11, 9, 0),
        EndTime: new Date(2025, 11, 11, 11, 0),
        ResourceId: 2, //room  { Name: "B-2", Id: 4, Color: "#77f807ff", GroupId: 2 },
        GroupId: 4 //a2
    },

    // Single-day meetings (Dec 20)
    {
        Id: 2,
        Subject: 'Client Interview (Internal)',
        StartTime: new Date(2025, 11, 13, 10, 0),
        EndTime: new Date(2025, 11, 17, 13, 0),
        ResourceId: 2,
        GroupId: 3
    },

    {
        Id: 3,
        Subject: 'Tech Demo',
        StartTime: new Date(2025, 11, 20, 11, 0),
        EndTime: new Date(2025, 11, 24, 12, 0),
        ResourceId: 3,
        GroupId: 2
    },

    // // Holiday + Lunch (Dec 22)
    // {
    //     Id: 4,
    //     Subject: 'Company Holiday',
    //     StartTime: new Date(2025, 11, 22),
    //     EndTime: new Date(2025, 11, 23),
    //     IsAllDay: true,
    //     ResourceId: 2,
    //     GroupId: 1
    // },

    // {
    //     Id: 5,
    //     Subject: 'Lunch with Team',
    //     StartTime: new Date(2025, 11, 22, 12, 0),
    //     EndTime: new Date(2025, 11, 22, 13, 0),
    //     ResourceId: 2,
    //     GroupId: 1
    // },

    // // Recurring daily (Dec 17 → Dec 28)
    // {
    //     Id: 6,
    //     Subject: 'Daily Standup',
    //     StartTime: new Date(2025, 11, 17, 9, 30),
    //     EndTime: new Date(2025, 11, 17, 10, 0),
    //     RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=12',
    //     ResourceId: 3,
    //     GroupId: 2
    // },

    // // Multi-resource call (Dec 27)
    // {
    //     Id: 7,
    //     Subject: 'Large Conference Call',
    //     StartTime: new Date(2025, 11, 27, 14, 0),
    //     EndTime: new Date(2025, 11, 27, 16, 0),
    //     ResourceId: [1, 2],
    //     Description: 'Review Q4 results.',
    //     GroupId: 3
    // }
];
// 
const DataFetch = (arg) => {

}
const EventClicked = (arg) => {
    console.log("Event clike line 105 -> ", arg);
}

const disableDefaultEditor = (args) => {

    console.log("disableDefaultEditor fired ");

};



// const onActionBegin = (args) => {
//     if (args.requestType === "eventCreate" || args.requestType == "Editor" || args.requestType === "eventChange") {
//         console.log("onActionBegin -> ", args.data[0]);
//         let startTime = new Date(args.data[0].StartTime)
//         let endTime = new Date(args.data[0].EndTime)
//         let resourceId = args.data[0].ResourceId;
//         console.log("Start Time: ", startTime);
//         console.log("End Time: ", endTime);
//         console.log("Resource ID: ", resourceId);



//         const newEvent = args.data[0];

//         const conflictEvent = appointmentData.find(evt => {
//             if (evt.ResourceId !== resourceId) return false; // check same room

//             const evtStart = new Date(evt.StartTime);
//             const evtEnd = new Date(evt.EndTime);

//             return start < evtEnd && end > evtStart; // overlap logic
//         });
//         console.log("Conflict Event: ", conflictEvent);


//         if (conflictEvent) {
//             console.log("❌ Conflict detected:");
//             console.log("Event Id:", conflictEvent.Id);
//             console.log("Subject:", conflictEvent.Subject);
//             console.log("Start:", conflictEvent.StartTime);
//             console.log("End:", conflictEvent.EndTime);
//         } else {
//             console.log("✅ No conflict. Event can be created.");
//         }



//     }




// };



const onActionBegin = (args) => {
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

        if (conflictEvent) {
            console.log("❌ Conflict detected with event:", conflictEvent);

            let comp = document.querySelector(".e-title-text");
            console.log("comp -> ", comp);
            let newTitle = document.createElement("div");
            newTitle.innerHTML = "Conflict detected with event: " + conflictEvent.Subject;
            newTitle.style.color = "red";
            newTitle.style.fontWeight = "bold";
            if (comp) {
                comp.appendChild(newTitle);
            }
            if (form) form.appendChild(errorMsg);

            return;
        }

        console.log("✅ No conflict. Event can be created.");
    }
};


const onContextMenuOpen = (args) => {
    // Only show menu when right-clicking an event
    if (!args.element || !args.element.classList.contains("e-appointment")) {
        args.cancel = true;
    }
};



const onContextMenuClick = (args) => {
    const scheduleObj = document.querySelector('.e-schedule').ej2_instances[0];

    // get event details from clicked event element
    const eventObj = scheduleObj.getEventDetails(args.element);

    switch (args.item.id) {
        case 'open':
            scheduleObj.openEditor(eventObj, "Save");
            break;

        case 'delete':
            scheduleObj.deleteEvent(eventObj.Id);
            break;

        case 'customAction':
            alert("Custom Action clicked on event: " + eventObj.Subject);
            break;

        default:
            break;
    }
};



console.log("_".repeat(50));
function Scheduler() {

    return (
        <ScheduleComponent
            cssClass='schedule-cell-dimension'
            actionBegin={onActionBegin}
            popupOpen={disableDefaultEditor}
            width="100%"
            height="550px"
            renderCell={DataFetch}
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
                    showWeekend: true,
                    workDays: [0, 1, 2, 3, 4, 6],
                    startHour: "08:00",
                    endHour: "14:00",
                    timeScale: {
                        enable: true,
                        interval: 140,
                        slotCount: 3,
                    }

                },
                { option: "TimelineMonth" }

            ]}
            currentView="TimelineMonth"
            allowDragAndDrop={true}
            allowResizing={true}
            
            
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
    );
}

export default Scheduler;