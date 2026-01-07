import { Draggable } from '@syncfusion/ej2-base';

import {
  ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
  Inject, ResourcesDirective, ResourceDirective,
  TimelineViews, TimelineMonth, DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';
import { useState } from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Rearranging from '../Other/Rearrange';
import AddEventPopup from '../Popup/AddEventPopup';
// import { BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';

const special = [
  {
    date: new Date(2025, 11, 16), // Dec 16, 2025
    startTime: new Date(2026, 1, 1, 8, 0),
    endTime: new Date(2026, 1, 1, 10, 0),
    isWorking: true,
    text: 'Public Holiday',
    cssClass: 'dec-16-holiday-cell'
  },
  {
    date: new Date(2025, 11, 20), // Dec 16, 2025
    startTime: new Date(2025, 11, 20, 8, 0),
    endTime: new Date(2025, 11, 20, 12, 0),
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

const appointmentData = [
  // Multi-day event (Dec 17–19)
  {
    Id: 1,
    Subject: '1',
    StartTime: new Date(2026, 1, 1, 9, 0),
    EndTime: new Date(2026, 1, 1, 11, 0),
    ResourceId: 2, //room  { Name: "B-2", Id: 4, Color: "#77f807ff", GroupId: 2 },
    GroupId: 4 //a2
  },

  // Single-day meetings (Dec 20)
  {
    Id: 2,
    Subject: 'Client Interview (Internal)',
    StartTime: new Date(2026, 1, 8, 10, 0),
    EndTime: new Date(2026, 1, 9, 13, 0),
    ResourceId: 2,
    GroupId: 3
  },

  {
    Id: 3,
    Subject: 'Tech Demo',
    StartTime: new Date(2026, 1, 2, 11, 0),
    EndTime: new Date(2026, 1, 4, 12, 0),
    ResourceId: 3,
    GroupId: 2
  },
  {
    Id: 4,
    Subject: 'Tech Demo',
    StartTime: new Date(2026, 1, 2, 11, 0),
    EndTime: new Date(2026, 1, 4, 12, 0),
    ResourceId: 3,
    GroupId: 2
  },

  {
    Id: 6,
    Subject: '2',
    StartTime: new Date(2026, 1, 1, 10, 0),
    EndTime: new Date(2026, 1, 1, 11, 0),
    ResourceId: 2,
    GroupId: 4
  },
  {
    Id: 7,
    Subject: '3',
    StartTime: new Date(2026, 1, 1, 11, 0),
    EndTime: new Date(2026, 1, 1, 12, 0),
    ResourceId: 2,
    GroupId: 4
  },
  {
    Id: 8,
    Subject: '4',
    StartTime: new Date(2026, 1, 1, 12, 0),
    EndTime: new Date(2026, 1, 1, 13, 0),
    ResourceId: 2,
    GroupId: 4
  },
  {
    Id: 9,
    Subject: '5',
    StartTime: new Date(2026, 1, 1, 13, 0),
    EndTime: new Date(2026, 1, 1, 14, 0),
    ResourceId: 2,
    GroupId: 4
  },

  {
    Id: 10,
    Subject: '6',
    StartTime: new Date(2026, 1, 2, 8, 0),
    EndTime: new Date(2026, 1, 2, 10, 0),
    ResourceId: 2,
    GroupId: 4
  }

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
const editorWindowTemplate = (props) => {
  return (
    <table className="custom-event-editor" style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td className="e-textlabel">Subject</td>
          <td colSpan={2}>
            <input
              type="text"
              className="e-field e-input"
              name="Subject"
              defaultValue={props?.Subject || ''}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Start Time</td>
          <td colSpan={2}>
            <DateTimePickerComponent
              className="e-field"
              name="StartTime"
              value={props?.StartTime || new Date()}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">End Time</td>
          <td colSpan={2}>
            <DateTimePickerComponent
              className="e-field"
              name="EndTime"
              value={props?.EndTime || new Date()}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Room</td>
          <td colSpan={2}>
            <select
              className="e-field e-input"
              name="ResourceId"
              defaultValue={props?.ResourceId || resourceDataSourceSecondLayer[0].Id}
            >
              {resourceDataSourceSecondLayer.map((r) => (
                <option key={r.Id} value={r.Id}>
                  {r.Name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Group</td>
          <td colSpan={2}>
            <select
              className="e-field e-input"
              name="GroupId"
              defaultValue={props?.GroupId || resourceDataSourceFirstLayer[0].Id}
            >
              {resourceDataSourceFirstLayer.map((g) => (
                <option key={g.Id} value={g.Id}>
                  {g.Name}
                </option>
              ))}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
};


console.log("_".repeat(50));
function Scheduler() {
  const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = useState(false);

  const openCustomPopup = (args) => {


    // if (args.type === "EventContainer") {
    //   console.log('openCustomPopup hitted', args)
    //   const items = args.element.querySelectorAll('.e-appointment');
    //   items.forEach((item) => {
    //     if (!item.classList.contains('free-drag')) {
    //       item.classList.add('free-drag');

    //       new Draggable(item, {
    //         clone: false,
    //         dragArea: args.element,
    //         abort: '.e-resize-handle',
    //       });
    //     }
    //   });

    // }

  };

  const onActionBegin = (args) => {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data = Array.isArray(args.data) ? args.data[0] : args.data;
      console.log("✅ Saved Event Data");
      Rearranging(args,appointmentData)
      console.log(data);


    }
    console.log(args)

   
  };


  console.log("Scheduler component rendered ", showPopup);
  return (
    <>
      <ScheduleComponent
        selectedDate={new Date(2026, 1, 1)}
        popupOpen={openCustomPopup}
        // editorTemplate={AddEventPopup}

        // editorTemplate={(props) => editorWindowTemplate(props)}
        cssClass='schedule-cell-dimension'
        actionBegin={onActionBegin}
        // popupOpen={disableDefaultEditor}
        width="100%"
        height="550px"
        renderCell={DataFetch}
        rowAutoHeight={false}
        eventClick={EventClicked}
        eventSettings={{ dataSource: appointmentData, enableMaxHeight: true }}
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
    </>
  );
}

export default Scheduler;