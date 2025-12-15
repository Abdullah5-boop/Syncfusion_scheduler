    const CellTempleteOne = (args) => {
        if (args.elementType === 'workCells' || args.elementType === 'monthCells') {
            const date = args.date;
            const day = date.getDay(); // 0 = Sunday, 6 = Saturday
           console.log(`date = ${date} day= ${day}`)
            if (day ==5) {
              
                args.element.style.backgroundColor = '#a40000';
                // args.element.style.color = '';
            }
        }
    };

    export default CellTempleteOne