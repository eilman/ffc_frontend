import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { forwardRef } from 'react';
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';
import { createOrder, updateOrder, deleteOrder } from '../store/actions/orderActions';

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

function Orders() {

  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [isUserCustomer, setIsUserCustomer] = useState(false);
  const [isUserRestManager, setIsUserRestManager] = useState(false);
  const orders = useSelector(state => state.orders);
  const userRole = useSelector(state => state.user.userRole);
  const userId = useSelector(state => state.user.userId);
  const restaurants = useSelector(state => state.restaurants);
  const location = useLocation();
  const { restaurantId } = location.state || {};

  useSelector(state => console.log(state));

  useEffect(() => {
      //Customers can only see their orders
    if (userRole === "customer") {
      setIsUserCustomer(true);
      const currentUserOrders = orders.filter(order => order.user.userId === userId);
      setOrderList(currentUserOrders);
    }
  }, [orders, userId, userRole]);
  
  
  useEffect(() => {
    if (userRole !== "customer") {
      //If this component is called by the display button of a restaurant record, only that restaurant's orders will be displayed.
      if (restaurantId !== undefined && restaurantId !== null) {
        const currentRestOrders = orders.filter(order => order.restaurant.restaurantId === restaurantId);
        setOrderList(currentRestOrders);
      }else if(userRole === 'restmudur'){
        //Restaurant managers can only see their restaurants' orders
        setIsUserRestManager(true);
        const currentUsersRestOrders = orders.filter(order => order.restaurant.user.userId === userId);
        setOrderList(currentUsersRestOrders);
      }
      else{
        setOrderList(orders);
      }
    }
  }, [orders, restaurantId, userId, userRole]);

  const lookupOptionsForRestName = {};
  restaurants.forEach(restaurant => {
    lookupOptionsForRestName[restaurant.restaurantName] = restaurant.restaurantName;
  });


  const [columns, setColumns] = useState([
    { title: 'Product Name', field: 'productName', lookup: { 'Hamburger Menu': 'Hamburger Menu', 'Doner Menu': 'Doner Menu', 'Pizza Menu': 'Pizza Menu' } },
    { title: 'Restaurant Name', field: 'restaurant.restaurantName', lookup: lookupOptionsForRestName },
    { title: 'Delivery Address', field: 'deliveryAddress'},
    { title: 'Customer Name', field: 'user.firstName'},
    { title: 'Customer Surname', field: 'user.lastName'},
    { title: 'Status', field: 'status', lookup: { 'Sipariş alındı': 'Sipariş alındı', 'Hazırlandı': 'Hazırlandı', 'Yolda': 'Yolda', 'Teslim edildi': 'Teslim edildi' }, initialEditValue: 'Sipariş alındı'  },
    { 
      title: 'Phone', 
      field: 'phone',
      editable: rowData => ({
        isEditable: true,
        maxLength: 11
      })
    }
  ]);


  const [data, setData] = useState(orders);
  //const isAdmin = userRole === 'genelmudur' || userRole === 'restmudur';

  return (
    <div>
      <Navbar open={true} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ maxWidth: '90%'}}>
          <MaterialTable
            title="Orders"
            columns={columns}
            data={orderList}
            icons={tableIcons}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (newData.phone.length !== 11) {
                      alert('Phone number must be 11 characters.');
                      reject();
                    }else{
                      dispatch(createOrder(userId, newData));
                      resolve();
                    }
                  }, 1000)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    if (dataUpdate[index].phone.length !== 11) {
                      alert('Phone number must be 11 characters.');
                      reject();
                    }else{
                      dispatch(updateOrder(dataUpdate[index].orderId, dataUpdate[index]));
                      resolve();
                    }
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dispatch(deleteOrder(dataDelete[index].orderId));

                    resolve()
                  }, 1000)
                }),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Orders;


