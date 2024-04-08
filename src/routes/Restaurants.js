import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { createRestaurant, updateRestaurant, deleteRestaurant } from '../store/actions/restaurantActions';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import VisibilityIcon from '@material-ui/icons/Visibility';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function Restaurants() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState([]);
  const restaurants = useSelector(state => state.restaurants);
  const userRole = useSelector(state => state.user.userRole);
  const userId = useSelector(state => state.user.userId);

  useSelector(state => console.log(state));

  useEffect(() => {
    //If the user is a restaurant manager, only that user's restaurants will be displayed.
    if(userRole === 'restmudur'){
      const userRestaurants = restaurants.filter(rest => rest.user.userId === userId);
      setRestaurantList(userRestaurants);
    }else{
      setRestaurantList(restaurants);
    }
  }, [restaurants, userId, userRole]);

  const lookupOptionsForRestManagerName = {};
  restaurantList.forEach(restaurant => {
    lookupOptionsForRestManagerName[restaurant.user.username] = restaurant.user.username;
  });
  console.log(lookupOptionsForRestManagerName);
  //, lookup: lookupOptionsForRestManagerName

  const [columns, setColumns] = useState([
    { title: 'Restaurant Name', field: 'restaurantName' },
    { title: 'Restaurant Address', field: 'restaurantAddress'},
    { title: 'Restaurant Manager Name', field: 'user.username'},
  ]);

  const [data, setData] = useState(restaurants);
  const isAdmin = userRole === 'genelmudur' || userRole === 'restmudur';

  return (
  <div>
    <Navbar open={true} />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ maxWidth: 800 }}>
      {isAdmin ? (
        <MaterialTable
          title="Restaurants"
          columns={columns}
          data={restaurantList}
          icons={tableIcons}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  dispatch(createRestaurant(newData));
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  dispatch(updateRestaurant(dataUpdate[index].restaurantId, dataUpdate[index]));
                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dispatch(deleteRestaurant(dataDelete[index].restaurantId));
                  resolve()
                }, 1000)
              }),
          }}
          actions={[
            {
              icon: VisibilityIcon,
              tooltip: 'View',
              onClick: (event, rowData) => {
                const restaurantId = rowData.restaurantId;
                console.log(restaurantId);
                //Navigate to the orders page to see specific orders with selected restaurant id.
                navigate(`/orders/${restaurantId}`, { state: { restaurantId: restaurantId } });
              }
            }
          ]}
        />
      ) : (
        <div>Current user does not have permission to view restaurants.</div>
      )}
      </div>
    </div>
  </div>
  )
}

export default Restaurants;
