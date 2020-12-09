import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { XSquareFill } from 'react-bootstrap-icons';

const CartTable = props => {
  const {
    items = [],
    removeHandler,
  } = props;

  return (
    <Table className="gs-cart__table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(i => (
            <tr key={i.gameID}>
              <td>
                <Button variant="text" onClick={() => removeHandler(i.gameID)}>
                  <XSquareFill size={24} className="gs-cart__remove" />
                </Button>
              </td>
              <td>{i.title}</td>
              <td>{i.price}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default CartTable;