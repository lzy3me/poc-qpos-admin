import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import api from '../api';

export default function OrderDashboard(props) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await api.get('/order');
    setOrders(response.data);
  }

  const mappingItemName = (item) => {
    return (
      <span>
        <b>{item.menuItemId.name}</b> {item.notes && `(${item.notes})` || ''} <i>quantity = {item.quantity}</i>  ;&nbsp;
      </span>
    );
  }

  return (
    <div>
      <h1>Order Dashboard</h1>
      <button onClick={fetchOrders}>Fetch Orders</button>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>Table {order.tableNumber}: {order.items.map((item) => mappingItemName(item))}</li>
        ))}
      </ul>
    </div>
  );
}