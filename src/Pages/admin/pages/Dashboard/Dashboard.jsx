// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import "./dashboard.scss";
import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { Chip } from "@mui/material";
import { endpoints } from "../../../../Helpers";

const Dashboard = () => {
  const statusBarCards = [
    { name: "Delivered", value: "10", color: "success" },
    { name: "Out For Delivery", value: "3", color: "secondary" },
    { name: "Cancelled", value: "2", color: "primary" }
  ];
  return (
    <div className="home h-full overflow-y-auto">
      <div className="homeContainer">
        <div className="widgets">
          {endpoints.map((endpoint) => (
            <Widget type={endpoint} />
          ))}
          {/* <Widget type="order" />
          <Widget type="stores" />
          <Widget type="customers" /> */}
          {/* <Widget type="earning" /> */}
        </div>
        {/* CHARTS Section */}
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}

        <div className="status-cards">
          {statusBarCards.map((card) => {
            return (
              <>
                <Chip
                  label={`${card.name} ${card.value}`}
                  variant="outlined"
                  color={card.color}
                />
              </>
            );
          })}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Deliveries</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
