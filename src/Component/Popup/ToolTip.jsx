import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const Tooltip = (props) => {
  const start = new Date(props.StartTime);
  const end = new Date(props.EndTime);

  return (
    <TooltipComponent
      content={`
${props.Subject}
Start: ${start.toLocaleString()}
End: ${end.toLocaleString()}
      `}
    >
      <div className="e-event-template">
      <span>
         {props.Subject}
        </span> 
        <span>
          
        </span>
        
      </div>
    </TooltipComponent>
  );
};

export default Tooltip;
