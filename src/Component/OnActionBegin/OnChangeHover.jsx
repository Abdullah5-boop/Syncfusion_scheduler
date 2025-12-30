export default function OnChangeHover(args, line, child) {
    console.log("on change hover dragStop", args)


    const { ResourceId, GroupId, LineId } = args.data;
    const msInDay = 1000 * 60 * 60 * 24;
    const matchedLine = line.find(l => l.LineId === LineId);
    const matchedChild = child.find(c => c.line_id === LineId)
    let start_date = new Date(args.data.StartTime)
    let end_date = new Date(args.data.EndTime)
    
    // end_date.setDate(end_date.getDate() +1)
    let date_input = matchedChild.line_hover_hight 
    end_date.setDate(end_date.getDate() + matchedChild.line_hover_hight)
    args.data.EndTime = end_date



    console.log("onChangeHover => \n", {

        start_date,
        end_date, 
        date_input,
        matchedChild, 
        matchedLine,
    });
    // args.cancel = true



}