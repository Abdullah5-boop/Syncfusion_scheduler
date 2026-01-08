import { useEffect, useState } from 'react';
import {
  ScheduleComponent,
  Day, Week, WorkWeek, Month, Agenda,
  TimelineViews, TimelineMonth,
  Inject, ResourcesDirective, ResourceDirective,
  ViewsDirective, ViewDirective,
  DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Rearranging from '../Other/Rearrange';

/* -------------------- RESOURCES -------------------- */

const resourceDataSourceSecondLayer = [
  { Name: "Room 1", Id: 1, Color: "#1abc9c" },
  { Name: "Room 2", Id: 2, Color: "#3498db" },
  { Name: "Room 3", Id: 3, Color: "#9b59b6" },
  { Name: "Room 4", Id: 4, Color: "#b2be05ff" }
];

const resourceDataSourceFirstLayer = [
  { Name: "A-1", Id: 1, Color: "#bc1a1aff", GroupId: 1 },
  { Name: "A-2", Id: 2, Color: "#bc1a1aff", GroupId: 1 },
  { Name: "B-1", Id: 3, Color: "#77f807ff", GroupId: 2 },
  { Name: "B-2", Id: 4, Color: "#77f807ff", GroupId: 2 },
  { Name: "C-1", Id: 5, Color: "#e67e22", GroupId: 3 },
  { Name: "B-4", Id: 6, Color: "#c3116aff", GroupId: 4 },
  { Name: "B-5", Id: 7, Color: "#c3116aff", GroupId: 4 }
];





/* -------------------- EVENTS -------------------- */

const appointmentData = [
  {
    Id: 1,
    Subject: '1',
    StartTime: new Date(2026, 1, 1, 9, 0),
    EndTime: new Date(2026, 1, 1, 11, 0),
    ResourceId: 2,
    GroupId: 4
  },

  {
    Id: 7,
    Subject: '3',
    StartTime: new Date(2026, 1, 1, 11, 30),
    EndTime: new Date(2026, 1, 1, 12, 0),
    ResourceId: 2,
    GroupId: 4
  },
  {
    Id: 8,
    Subject: '4',
    StartTime: new Date(2026, 1, 1, 12, 30),
    EndTime: new Date(2026, 1, 1, 13, 0),
    ResourceId: 2,
    GroupId: 4
  },
  {
    Id: 9,
    Subject: '5',
    StartTime: new Date(2026, 1, 1, 13, 30),
    EndTime: new Date(2026, 1, 1, 14, 0),
    ResourceId: 2,
    GroupId: 4
  }
];

/* -------------------- COMPONENT -------------------- */

function Scheduler() {



  useEffect(() => {
    const timer = setTimeout(() => {
      const timeRows = document.querySelectorAll(".e-time-slots");
      const dateSlots = document.querySelectorAll(".e-header-cells");
      const tableCell = document.querySelectorAll(".e-work-cells")


      if (timeRows.length > 0) {
        const timeRowParent = timeRows[0].parentElement;
        console.log("time row parent -> ", timeRowParent);
        timeRowParent.style.display = "none";
      }

      if (dateSlots.length > 0) {
        console.log(dateSlots);
        dateSlots.forEach(slot => {
          slot.style.width = "50px";
          slot.style.minWidth = "50px"; // IMPORTANT for table layout
        });
      }

      if (tableCell.length > 0) {

        // tableCell.forEach((cell, index) => {
        //   if (!cell?.style) return;

        //   if (index % 2 === 0) {
        //     // Even index
        //     cell.style.setProperty("border-width", "0 0 1px 1px", "important");
        //   } else {
        //     // Odd index
        //    cell.style.setProperty("border-width", "0 1px 1px 0", "important");
        //   }
        // });

      }
    }, 0);


    return () => clearTimeout(timer);
  }, []);



  const onActionBegin = (args) => {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      console.log('Saved Event:', args.data);
      Rearranging(args, appointmentData)

    }
  };

  return (
    <ScheduleComponent
      selectedDate={new Date(2026, 1, 1)}
      height="550px"
      width="100%"
      currentView="TimelineWorkWeek"
      rowAutoHeight={false}
      actionBegin={onActionBegin}
      allowDragAndDrop={true}
      // allowResizing={true}
      group={{ resources: ['Resources', 'Group'] }}
      eventSettings={{
        dataSource: appointmentData,
        enableMaxHeight: true
      }}

    >

      {/* ----------- VIEWS (eventHeight APPLIED HERE) ----------- */}
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="WorkWeek" />
        <ViewDirective option="Month" />
        <ViewDirective option="Agenda" />

        <ViewDirective
          option="TimelineDay"
          eventHeight={22}
        />

        <ViewDirective
          option="TimelineWeek"
          eventHeight={22}
        />

        <ViewDirective
          option="TimelineWorkWeek"
          eventHeight={0}
          interval={4}
          showWeekend={true}
          // headerRows={[{ option: 'Date' }]}

          workDays={[0, 1, 2, 3, 4, 6]}
          startHour="08:00"
          endHour="16:00"
          timeScale={{
            enable: true,
            interval: 480,
            slotCount: 1
          }}
          dateHeaderTemplate={(props) => (
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {props.date.getDate()}  {/* Shows only the day number, e.g., 1, 2, ..., 15 */}
            </div>
          )}


        />

        <ViewDirective
          option="TimelineMonth"
          eventHeight={22}
        />
      </ViewsDirective>

      {/* ----------- RESOURCES ----------- */}
      <ResourcesDirective>
        <ResourceDirective
          field="ResourceId"
          title="Rooms"
          name="Resources"
          allowMultiple={true}
          dataSource={resourceDataSourceSecondLayer}
          textField="Name"
          idField="Id"
          colorField="Color"
        />

        <ResourceDirective
          field="GroupId"
          title="Groups"
          name="Group"
          allowMultiple={true}
          dataSource={resourceDataSourceFirstLayer}
          textField="Name"
          idField="Id"
          colorField="Color"
          groupIDField="GroupId"
        />
      </ResourcesDirective>

      <Inject services={[
        Day, Week, WorkWeek, Month, Agenda,
        TimelineViews, TimelineMonth,
        DragAndDrop, Resize
      ]} />
    </ScheduleComponent>
  );
}

export default Scheduler;
