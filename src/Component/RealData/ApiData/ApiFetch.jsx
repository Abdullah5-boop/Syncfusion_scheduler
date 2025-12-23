export async function getAllData() {
    const obj = {};

    try {
        // // Fetch /all
        // const allDataResponse = await fetch("http://localhost:3000/all");
        // const allData = await allDataResponse.json();
        // console.log("_".repeat(40), "\nData from /all route:", allData);

        // Fetch Plan Info
        try {
            const planRes = await fetch('/api/plan_info/company_id/1/location_id/2/floor_id/0/txt_date_from/21-11-2025/user_id/1/auto_balancing/0');
            const planData = await planRes.json();
            console.log("_".repeat(40), "\nPlan Info:", planData);
            obj["plan"] = planData.resultset;
        } catch (err) {
            console.error("Plan Info fetch error:", err);
        }

        // Fetch Work Hour
        try {
            const workHourRes = await fetch('/api/work_hour/company_id/1/location_id/2/start_date/1-11-2025/end_date/1-12-2027');
            const workHourData = await workHourRes.json();
            console.log("_".repeat(40), "\nWork Hour:", workHourData);
            obj["company"] = workHourData?.resultset;
        } catch (err) {
            console.error("Work Hour fetch error:", err);
        }

        // Fetch Line Info
        try {
            const lineRes = await fetch('/api/line_info/company_id/1/location_id/2/floor_id/0/user/1/date/2025-12-21');
            const lineData = await lineRes.json();
            console.log("_".repeat(40), "\nLine Info:", lineData);
            obj["line"] = lineData.resultset;
        } catch (err) {
            console.error("Line Info fetch error:", err);
        }

        console.log("*".repeat(50), "\nFinal obj:", obj, "\n" + "*".repeat(50));
        return obj;

    } catch (err) {
        console.error("Failed to fetch /all data:", err);
        return null;
    }
}
