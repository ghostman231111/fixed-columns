import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./style.scss";

export const CustomTable = ({ enablePinning, ...rest }) => {
  return <Custom_TableRoot enablePinning={enablePinning} {...rest} />;
};

export const parseCSSVarId = (id) => id.replace(/[^a-zA-Z0-9]/g, "_");

function getCommonCellStyles(column, header, table) {
  const widthStyles = {
    minWidth: `max(calc(var(--${header ? "header" : "col"}-${parseCSSVarId(
      header?.id ?? column.id
    )}-size) * 1px), ${column.columnDef.minSize ?? 30}px)`,
    width: `calc(var(--${header ? "header" : "col"}-${parseCSSVarId(
      header?.id ?? column.id
    )}-size) * 1px)`,
  };
  return {
    position:
      column.getIsPinned() && column.columnDef.columnDefType !== "group"
        ? "sticky"
        : undefined,

    left:
      column.getIsPinned() === "left"
        ? `${column.getStart("left")}px`
        : undefined,

    ...widthStyles,
  };
}

const Custom_TableRoot = (props) => {
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnPinning, setColumnPinning] = React.useState(
    props.initialState.columnPinning ?? {}
  );

  const table = {
    ...useReactTable({
      data: props.data,
      columns: props.columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        columnPinning,
      },
    }),
  };


  return (
    <div className="view">
      <div className="wrapper">
        <table className="table">
          <thead style={{display: 'table-row-group', position:'relative', }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{top:0, display:'table-row'}}>
                {headerGroup.headers.map((header, idx) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={1}
                      style={{
                        flexDirection: undefined,
                        fontWeight:'bold',
                        padding:'1rem',
                        paddingBottom:'0.6rem',
                        paddingTop:'1.25rem',
                        overflow: "visible",
                        verticalAlign: "top",
                        background: header.column.getIsPinned() ? 'white' : 'transparent',
                        zIndex: header.column.getIsPinned() ? 5 : 1,
                        ...getCommonCellStyles(header.column, header, table),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      flexDirection: undefined,
                        fontWeight:'bold',
                        padding:'1rem',
                        paddingBottom:'0.6rem',
                        paddingTop:'1.25rem',
                        overflow: "visible",
                        verticalAlign: "top",
                        background: cell.column.getIsPinned() ? 'white' : 'transparent',
                        zIndex: cell.column.getIsPinned() ? 5 : 1,
                      ...getCommonCellStyles(cell.column, cell, table),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
