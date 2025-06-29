import { useEffect, useState } from 'react';
import { socket } from '../socket';
import api from '../api';

export default function OrderDashboard(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('admin-join', 'admin1');
      fetchOrders();
    });

    socket.on('order-created', (data) => {
      alert(`New Order Received: Table ${data.tableNumber}`);
      fetchOrders();
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      socket.emit('admin-leave', 'admin1');
    });

    return () => {
      socket.off('order-created');
      socket.off('connect');
      socket.off('disconnect');
    }
  }, []);

  const fetchOrders = async () => {
    const response = await api.get('/order');
    setOrders(response.data);
  }

  const handleCompleteOrder = async (orderId) => {
    await api.put(`/admin/order/${orderId}`, { status: 'completed' });
    fetchOrders();
  }

  const handleCancelOrder = async (orderId) => {
    await api.put(`/admin/order/${orderId}`, { status: 'cancelled' });
    fetchOrders();
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
      <button onClick={fetchOrders}>Fetch Orders</button>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Table {order.tableNumber}: {order.items.map((item) => mappingItemName(item))}&nbsp;
            <button onClick={() => handleCompleteOrder(order._id)}>Complete</button>&nbsp;
            <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}