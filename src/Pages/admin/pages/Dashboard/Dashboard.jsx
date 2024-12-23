// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import * as React from 'react';
import './dashboard.scss';
import Widget from '../../components/widget/Widget';
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
import Table from '../../components/table/Table';
import { Button, Chip, Switch } from '@mui/material';
import { endpoints } from '../../../../Helpers';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../admin/context/AuthContext';
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const Dashboard = () => {
  const statusBarCards = [
    { name: 'Delivered', value: '10', color: 'success' },
    { name: 'Out For Delivery', value: '3', color: 'secondary' },
    { name: 'Cancelled', value: '2', color: 'primary' }
  ];
  const auth = useAuth();
  const currentUser = auth.token || {};

  const isVendor = currentUser?.role?.id === 2 || false;

  const [checked, setChecked] = React.useState(false);

  const handleChange = async (event) => {
    if (event) {
      setChecked(event?.target?.checked);
      try {
        await updateDoc(doc(db, "users", currentUser.id), {
          status: event.target.checked
        }).then((querySnapshot) => {
          // setRefreshDataCounter((prev) => ++prev);
        });
        // toast.success(
        //   `Account for ${row?.storeName || ""} ${
        //     e.target.checked ? "Deactivated" : "Activated"
        //   }`
        // );
        // .finally(() => setRefreshDataCounter((prev) => ++prev));
        // setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    };
  };

  return (
    <div className='home h-full overflow-y-auto'>
      <div className='homeContainer'>
        {isVendor && (
          <div className='flex justify-end items-center w-full'>
            <p>Temporary store closed</p>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        )}

        <div className='widgets'>
          {endpoints.filter(endPoint => isVendor ? endPoint !== 'customers' && endPoint !== 'users' : endPoint).map((endpoint) => (
              <Widget type={endpoint} user={currentUser}/>
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

        <div className='status-cards'>
          {statusBarCards.map((card) => {
            return (
              <>
                <Chip
                  label={`${card.name} ${card.value}`}
                  variant='outlined'
                  color={card.color}
                />
              </>
            );
          })}
          {/* <Button>Temporary store closed</Button> */}
        </div>

        <div className='listContainer'>
          <div className='listTitle'>Latest Deliveries</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
