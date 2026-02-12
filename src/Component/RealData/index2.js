// const Linedata = require("./line");
// const PlanData = require("./Plan")
// // const { modifyStratAndEndTime, helloWorld } = require("./compayRedesign.js")
// import modifyStratAndEndTime from "./compayredesign.js";
// const company = require("./company.js");
// const planData = require("./Plan");

import Linedata from "./line.js";
import PlanData from "./Plan.js";
import modifyStratAndEndTime from "./compayredesign.js";
import companyInfoList from "./company.js";
import { getAllData } from "./ApiData/ApiFetch.jsx";

const colors = [
  "#1abc9c", "#8e44ad", "#2ecc71", "#27ae60", "#3498db",
  "#2980b9", "#9b59b6", "#ff7675", "#34495e", "#2c3e50",
  "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c",
  "#c0392b", "#ecf0f1", "#bdc3c7", "#95a5a6", "#7f8c8d",
  "#ff6b6b", "#ff9f43", "#feca57", "#1dd1a1", "#48dbfb",
  "#5f27cd", "#c8d6e5", "#576574", "#00d2d3", "#01a3a4",
  "#54a0ff", "#2e86de", "#5f27cd", "#341f97", "#ee5253",
  "#ff4757", "#ffa502", "#ff6348", "#ff7f50", "#ff9ff3",
  "#f368e0", "#00cec9", "#0984e3", "#6c5ce7", "#fd79a8",
  "#e84393", "#2d3436", "#636e72", "#b2bec3", "#dfe6e9",
  "#fab1a0", "#ff7675", "#74b9ff", "#a29bfe", "#81ecec",
  "#55efc4", "#ffeaa7", "#fdcb6e", "#e17055", "#d63031",
  "#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#fd79a8",
  "#e84393", "#1e90ff", "#ff1493", "#32cd32", "#ff4500",
  "#2ed573", "#7bed9f", "#70a1ff", "#5352ed", "#3742fa",
  "#ffa502", "#ff6b81", "#a4b0be", "#57606f", "#2f3542"
];
console.log("main data herec",await getAllData())



function dateStringToDate(dateStr) {
  const [day, month, year] = dateStr.split("-").map(Number);

  // month - 1 because JS months are 0-based
  return new Date(year, month - 1, day);
}

let dataStore = Linedata.map(data => data.FLOOR_ID);
let unique_floor_id = Array.from(new Set(dataStore));

//row parents name

let layer_one = unique_floor_id.map((data, index) => {
  return {
    Name: data,
    Id: index + 1,
    Color: colors[index]
  };
});

//row child Name 
let children = Linedata.map((line, index) => {
  let parent = layer_one.find(parent => parent.Name === line.FLOOR_ID)
  if (parent) return {
    Id: index + 1,
    Name: line.LINE_NAME,
    GroupId: parent.Id,
    line_id: line.LINE_ID
  }
})

//create appointments

let appointment = []






console.log("_".repeat(50), "\n", "parent layer", "\n")
console.log(layer_one);

console.log("_".repeat(50), "\n", "Child layer", "\n")
console.log(children)





//plan create two 


PlanData.forEach(plan => {
  let value =
    modifyStratAndEndTime(
      plan.start_date,
      plan.start_hour,
      plan.end_date,
      plan.end_hour,
      plan.company_id
    );
  if (value) {
    let obj = { ...value, subject: plan.company_name, plan_id: plan.plan_id, line_id: plan.line_id }
    appointment.push(obj);

  }


})

// children.forEach(child=>{
//   let find = appointment.find(app=> app.line_id === child.line_id)
//   if (find) console.log("--------",find)

// })



console.log("_".repeat(40))
console.log(appointment[0])
console.log("_".repeat(40))

let temps = []

// appointment.forEach(app => {
//   let filters = children.find(child => app.line_id === child.line_id)
//   if(filters) temps.push({...filters,...app, ResourceId : filters?.GroupId , GroupId: filters?.Id})

// })


appointment.forEach(app => {
  const child = children.find(c => c.line_id === app.line_id);
  if (!child) return;

  temps.push({
    Id: app.plan_id,
    Subject: app.subject,
    StartTime: app.startTime,   // ✅ already Date
    EndTime: app.endTime,       // ✅ already Date
    ResourceId: child.GroupId,  // floor
    GroupId: child.Id           // line
  });
});



let temps2 = [temps[0]]


export default { layer_one, children, temps2, temps }





















// console.log( appointment)
// console.log(appointment.length)

