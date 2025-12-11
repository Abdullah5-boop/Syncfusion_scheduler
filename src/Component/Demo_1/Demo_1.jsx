import * as React from "react";

import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Filter,
  Sort,
  Page
} from "@syncfusion/ej2-react-treegrid";

import DataSource from "../../../public/DataSource";  // FIXED

function Demo_1() {
  return (
    <>
      <h1>Hello world</h1>

      <TreeGridComponent
        dataSource={DataSource}
        childMapping="children"
        treeColumnIndex={0}
        allowFiltering={true}
        allowSorting={true}
       
      >
        <ColumnsDirective>

          <ColumnDirective
            field="id"
            headerText="Employee ID"
            width="90"
            textAlign="left"
            isPrimaryKey={true}
            
          />

          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
          />

          <ColumnDirective
            field="status"
            headerText="Status"
            width="150"
            textAlign="Center"
          />

          <ColumnDirective
            field="startDate"
            headerText="SD"
            width="150"
            type="date"
            format="yMd"
            textAlign="Center"
          />

          <ColumnDirective
            field="endDate"
            headerText="ED"
            width="150"
            type="date"
            format="yMd"
            textAlign="Center"
          />

          <ColumnDirective
            field="children"
            headerText="Children Count"
            width="150"
            textAlign="Center"
            valueAccessor={(field, data) => {
              const count = data.children?.length || 0;
              return count > 2 ? "one" : "two";
            }}
          />

        </ColumnsDirective>

        {/* REQUIRED MODULES */}
        <Inject services={[Filter, Sort]} />

      </TreeGridComponent>
    </>
  );
}

export default Demo_1;
