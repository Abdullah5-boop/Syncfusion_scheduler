 import { TooltipComponent } from "@syncfusion/ej2-react-popups";
 const Tooltip = (props) => {
    // console.log(props)
  return (
  <TooltipComponent content={props.Subject}>
      <div className="e-event-template">
        {props.Subject}
  

      </div>
    </TooltipComponent>
  );
};
export default Tooltip