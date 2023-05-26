import "./App.css";
import { data } from "./data";
import { CustomTable } from "./components/CustomTable";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    sticky: "left",
  },
  {
    accessorKey: "middleName",
    header: "Middle Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "address",
    header: "Address",
    size: 300,
  },
  {
    accessorKey: "city", //this column gets pinned to the right by default because of the initial state,
    header: "City",
  },

  {
    accessorKey: "state", //this column gets pinned left by default because of the the initial state,
    header: "State",
    sticky: "right",
  },
];

function App() {
  return (
    <div className="App">
      <CustomTable 
        data={data} 
        columns={columns} 
        enablePinning
        initialState={{ columnPinning: { left: ['state', 'id'] } }}
       />
    </div>
  );
}

export default App;
