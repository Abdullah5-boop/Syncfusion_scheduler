import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";



export default function AddEvent(props) {
  const data = props.data || props.event || {};

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
                defaultValue={data.Subject || ""}
              />
            </td>
          </tr>

          <tr>
            <td className="e-textlabel">Start Time</td>
            <td>
              <DateTimePickerComponent
                name="StartTime"
                className="e-field"
                defaultValue={data.StartTime || new Date()}
              />
            </td>
          </tr>

          <tr>
            <td className="e-textlabel">End Time</td>
            <td>
              <DateTimePickerComponent
                name="EndTime"
                className="e-field"
                defaultValue={data.EndTime || new Date()}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 🔒 ALWAYS render hidden fields */}
      <input
        type="hidden"
        name="ResourceId"
        className="e-field"
        defaultValue={data.ResourceId || ""}
      />

      <input
        type="hidden"
        name="GroupId"
        className="e-field"
        defaultValue={data.GroupId || ""}
      />
    </div>
  );
}
