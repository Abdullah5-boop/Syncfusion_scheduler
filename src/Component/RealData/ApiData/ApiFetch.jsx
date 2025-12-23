export async function getAllData() {
  try {
    // Fetch data from your Express /all route
    const allDataResponse = await fetch("http://localhost:3000/all");
    const allData = await allDataResponse.json();

    console.log("_".repeat(40), "\nData from /all route:", allData);

    // Fetch Plan Info via Vite proxy and print
    fetch('/api/plan_info/company_id/1/location_id/2/floor_id/0/txt_date_from/21-11-2025/user_id/1/auto_balancing/0')
      .then(res => res.json())
      .then(planData => console.log("_".repeat(40), "\nPlan Info:", planData))
      .catch(err => console.error("Plan Info fetch error:", err));

    // Fetch Work Hour via Vite proxy and print
    fetch('/api/work_hour/company_id/1/location_id/2/start_date/1-11-2025/end_date/1-12-2027')
      .then(res => res.json())
      .then(workHourData => console.log("_".repeat(40), "\nWork Hour:", workHourData))
      .catch(err => console.error("Work Hour fetch error:", err));

    // Fetch Line Info via Vite proxy and print
    fetch('/api/line_info/company_id/1/location_id/2/floor_id/0/user/1/date/2025-12-21')
      .then(res => res.json())
      .then(lineData => console.log("_".repeat(40), "\nLine Info:", lineData))
      .catch(err => console.error("Line Info fetch error:", err));

    // Return the original /all data without changes
    return allData;

  } catch (err) {
    console.error("Failed to fetch /all data:", err);
    return null;
  }
}

