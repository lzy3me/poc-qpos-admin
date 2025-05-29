import { useEffect, useState } from 'react';
import { socket } from '../../socket';

export function NewOrderHandler() {
  const [newOrder, setNewOrder] = useState([]);

  useEffect(() => {
    function onNewOrder(data) {
      setNewOrder(data);
      console.log("EVENT --> ", data);
      alert(data);
    }
    
    socket.on('order-created', onNewOrder);

    return () => {
      socket.off('order-created', onNewOrder);
    }
  }, [newOrder]);
}