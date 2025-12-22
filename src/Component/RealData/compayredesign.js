
// const planData = require("./Plan");
import planData from './Plan'
// const companyData = require("./company");
import companyData from "./company"

/*************************************************
 * DATE CONVERTER
 *************************************************/
function convertToDate(dateStr) {
    if (!dateStr) return null;

    // Case 1: DD-MMM-YY (01-Dec-25)
    if (/[A-Za-z]/.test(dateStr)) {
        const [day, monStr, year] = dateStr.split("-");

        const monthMap = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };

        const fullYear = year.length === 2 ? 2000 + Number(year) : Number(year);
        return new Date(fullYear, monthMap[monStr], Number(day));
    }

    // Case 2: YYYY-MM-DD
    if (dateStr.split("-")[0].length === 4) {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    // Case 3: DD-MM-YYYY or DD-MM-YY
    const [day, month, year] = dateStr.split("-").map(Number);
    const fullYear = year < 100 ? 2000 + year : year;

    return new Date(fullYear, month - 1, day);
}

/*************************************************
 * HOUR SLOT GENERATOR
 *************************************************/
function hourCalculation(start_date, end_date, total_work_hour) {
    const StartSlots = [];
    const EndSlots = [];

    for (let i = 0; i < total_work_hour + 1; i++) {
        const slot = new Date(start_date);
        slot.setHours(8 + i, 0, 0, 0); // 08:00 start
        StartSlots.push(slot);
    }

    for (let i = 0; i < total_work_hour + 1; i++) {
        const slot = new Date(end_date);
        slot.setHours(8 + i, 0, 0, 0);
        EndSlots.push(slot);
    }

    return { StartSlots, EndSlots };
}

/*************************************************
 * MAIN FUNCTION
 *************************************************/
function modifyStratAndEndTime(start_date, start_th_hour, end_date, end_th_hour, company_id) {

    let result = {}

    let parameter = {
        start_date, start_th_hour, end_date, end_th_hour, company_id
    }
    result['parmenter'] = parameter

    const startDateObj = convertToDate(start_date);
    const endDateObj = convertToDate(end_date);


    if (!startDateObj || !endDateObj) {
        console.error("Invalid date input");
        return;
    }

    const company_details = companyData.find((com, index) => {
        const applyDate = convertToDate(com.APPLYING_PERIOD_DATE);

        return (
            applyDate &&
            applyDate.getMonth() === startDateObj.getMonth() &&
            applyDate.getFullYear() === startDateObj.getFullYear() 
            && com.COMPANY_ID === company_id

        );
    });

    if (!company_details) {
        // console.log("_".repeat(30), "\n", "company detail (parameter)")
        // console.log(parameter)
        // console.error("Company details not found");
        return;
    }

    result['company_details'] = company_details







    const { StartSlots, EndSlots } = hourCalculation(
        startDateObj,
        endDateObj,
        company_details.WORKING_HOUR
    );
    //  console.log("_".repeat(50),"\n", "StartSlots ")
    // console.log(StartSlots);
    // console.log(EndSlots);
    // console.log(`StartSlots`)
    // console.log("_".repeat(50),"\n")

    if (
        !StartSlots[start_th_hour] ||
        !EndSlots[end_th_hour]
    ) {
        console.error("Invalid hour index");
        return;
    }

    // console.log("_".repeat(50));

    // console.log(
    //     new Date(StartSlots[start_th_hour]).toString(),
    //     "_".repeat(10),
    //     new Date(EndSlots[end_th_hour]).toString()
    // );

    let obj = {
        COMPANY_ID: company_details.COMPANY_ID,
        COMPANY_WORK: company_details.WORKING_HOUR,
        startTime: StartSlots[start_th_hour],
        endTime: EndSlots[end_th_hour],
        g_con_id: company_id
    };
    result["output"] = obj
    // console.log("_".repeat(30), "\n", "result")
    // console.log(result)
    return obj
}
function helloWorld() {
    console.log("hello world")
}



// module.exports = { modifyStratAndEndTime }
export default modifyStratAndEndTime