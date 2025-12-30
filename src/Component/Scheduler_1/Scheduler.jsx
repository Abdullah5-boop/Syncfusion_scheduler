
import {
    ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
    Inject, ResourcesDirective, ResourceDirective,
    TimelineViews, TimelineMonth, DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';
// import maindata from "../RealData/index2"
import { useEffect, useRef, useState } from 'react';
import AddEventPopup from '../Popup/EventShowPopup.jsx';
import CellTempleteOne from '../CellTemplete/CellTempleteOne';
import { appointmentDatas, appointmentData } from '../Other/MakeAppointment';
import preparedData from "../RealData/indexAsync.js";
import Loading from '../Popup/Loading.jsx';
// import { BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Tooltip from '../Popup/ToolTip.jsx';
import OnChangeHover from '../OnActionBegin/OnChangeHover.jsx';
import FindConflictEvent from '../OnActionBegin/findConflictEvent.jsx';
import OnDrag from '../Ondrag/Ondrag.jsx';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns/index.js';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars/index.js';
import AddEvent from '../Popup/AddEvent.jsx';

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


// console.log(maindata)






// 
const DataFetch = (arg) => {

}
const EventClicked = (arg) => {
    // console.log("Event clike line 105 -> ", arg);
}






function Scheduler() {
    const scheduleRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [open, setOpen] = useState(false);
    let [parent, setParent] = useState([])
    let [child, setChild] = useState([])
    let [line, setLine] = useState([])
    let [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([]);
    // Removed invalid destructuring declaration
    const scheduleObj = useRef(null);
    const onPopupOpen = (args) => {

        console.log("onPopupOpen args -> ", args);
    };



    const onActionComplete = (args) => {
        console.log("onActionComplete")
        if (args.requestType === "eventCreated") {
            setEvents(prev => [...prev, args.data[0]]);
        }
    }


    const onDragStart = (args) => {
        const el = args.element; // This is the drag helper that sticks to mouse

        // Example styles
        el.style.setProperty('opacity', '0.6', 'important');
        el.style.setProperty('background-color', '#ff7675', 'important');
        el.style.setProperty('border', '2px dashed #d63031', 'important');
        el.style.setProperty('box-shadow', '0 8px 20px rgba(0,0,0,.3)', 'important');

        // Optional: change text while dragging
        const subjectEl = el.querySelector('.e-subject');
        if (subjectEl) subjectEl.innerText = 'Dragging...';

        console.log("drag start => ", args.data)
    };


    const onActionBegin = (args) => {


        if (args.requestType === "eventCreate") {
            console.log("Final event data:", args.data);
        }


        let specialDayConfictState = false;
        console.log("hi", args)
        if (args.requestType === "eventCreate" || args.requestType === "eventChange") {
            const eventData = Array.isArray(args.data) ? args.data[0] : args.data;

            console.log("onActionBegin -> ", eventData);


            let startTime = new Date(eventData.StartTime);
            let endTime = new Date(eventData.EndTime);
            let resourceId = eventData.ResourceId;

            const conflictEvents = appointmentData.find(evt => {
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
            // function isWithinWorkingHours() {

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

            console.log("_".repeat(20), "\n");

          

            const conflictEvent = FindConflictEvent(eventData, appointmentData);

            if (conflictEvent) {
                console.log("❌ Conflict detected with event:", conflictEvent);

                args.cancel = true;
                alert("This date is already booked!");

                return;
            }


            console.log("✅ No conflict. Event can be created.");
        }


    };


    const onDrag = (args) => {
        OnDrag(args, child, line)
        // console.log("_".repeat(50), '\n', '* end * ')
    };






    const onDragStop = (args) => {
        console.log("onDragStop called")
        const el = args.element;

        // Reset styles
        el.style.removeProperty('opacity');
        el.style.removeProperty('background-color');
        el.style.removeProperty('border');
        el.style.removeProperty('box-shadow');

        // Reset text
        const subjectEl = el.querySelector('.e-subject');
        if (subjectEl) subjectEl.innerText = args.data.Subject;
        OnChangeHover(args, line, child)
    };





    async function useData() {
        const data = await preparedData;
        setParent(data.layer_one);
        setChild(data.children);
        setLine(data.temps);
        setLoading(true)
        setEvents(data.temps);
        // console.log(, data.children, data.temps);
    }



    useData();







    return (
        <>
            {loading ?
                <ScheduleComponent
                    actionComplete={onActionComplete}
                    // maxEventsPerRow={0}
                    ref={scheduleObj}
                    editorTemplate={AddEvent}

                    dragStart={onDragStart}
                    drag={onDrag}
                    dragStop={onDragStop}
                    // beforeRender={onBeforeRender}
                    selectedDate={new Date(2025, 11, 1)}
                    popupOpen={onPopupOpen}
                    // editorTemplate={AddEventPopup}
                    cssClass='custom-month-view'
                    actionBegin={onActionBegin}
                    // popupOpen={disableDefaultEditor}
                    width="100%"
                    height="550px"

                    rowAutoHeight={false}
                    eventClick={EventClicked}
                    eventSettings={{ dataSource: events, template: Tooltip }}
                    // eventSettings={{ dataSource: appointmentData }}
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
                            // showWeekend: false,

                            startHour: "08:00",
                            endHour: "14:00",
                            timeScale: {
                                enable: true,
                                interval: 140,
                                slotCount: 3,
                            }

                        },
                        { option: "TimelineMonth", interval: 3 }

                    ]}
                    currentView="TimelineMonth"
                    allowDragAndDrop={true}
                    allowResizing={true}
                    //  cellTemplate={<CellTempleteOne></CellTempleteOne>}
                    renderCell={CellTempleteOne}


                >
                    <ResourcesDirective >
                        <ResourceDirective
                            field="ResourceId"
                            name="Resources"
                            dataSource={parent}
                            textField="Name"
                            idField="Id"
                            colorField="Color"


                        // dataSource={resourceDataSourceSecondLayer}

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
                            dataSource={child}
                        // dataSource={resourceDataSourceFirstLayer}
                        >

                        </ResourceDirective>
                    </ResourcesDirective>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda, TimelineViews, TimelineMonth, DragAndDrop, Resize]} />

                </ScheduleComponent>


                :
                <Loading></Loading>

            }


            {/* <Loading></Loading> */}



        </>
    );
}

export default Scheduler;