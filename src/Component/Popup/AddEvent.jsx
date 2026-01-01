import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useState } from "react";


export default function AddEvent(props) {
  const data = props.data || props.event || {};
  const [subject, setSubject] = useState(data.Subject || "");
  const [startTime, setStartTime] = useState(data.StartTime || new Date());
  const [endTime, setEndTime] = useState(data.EndTime || new Date());

  return (
    <div className="custom-editor">
      <table className="e-schedule-form" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td className="e-textlabel">Subject</td>
            <td>
              <input
                name="Subject"
                className="e-field e-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Start Time</td>
            <td>
              <DateTimePickerComponent
                name="StartTime"
                className="e-field"
                value={startTime}
                change={(e) => setStartTime(e.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">End Time</td>
            <td>
              <DateTimePickerComponent
                name="EndTime"
                className="e-field"
                value={endTime}
                change={(e) => setEndTime(e.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <input type="hidden" name="ResourceId" className="e-field" value={data.ResourceId || ""} />
      <input type="hidden" name="GroupId" className="e-field" value={data.GroupId || ""} />
    </div>
  );
}
