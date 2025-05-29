import { useEffect, useState } from 'react';
import { socket } from '../socket'
import './App.css';
import { SocketConnection } from '../components/order/SocketConnection';
import { NewOrderHandler } from '../components/order/NewOrderHandler';

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [newOrder, setNewOrder] = useState([]);

  socket.emit('admin-join', 'admin1');

  useEffect(() => {
    function onConnect() {
      console.log("Connect");
      
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Disconnect");
      setIsConnected(false);
    }

    function onNewOrder(data) {
      setNewOrder(prv => [...prv, data]);
      alert(data.toString())
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('order-created', onNewOrder);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('order-created', onNewOrder);
    }
  }, []);

  return (
    <div>
      <h1>Order Dashboard</h1>

      <p>Connected : {isConnected}</p>
      <SocketConnection />
      {/* <NewOrderHandler /> */}
    </div>
  )
}