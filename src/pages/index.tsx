import React, { useState } from 'react';

import styles from './index.module.scss';
import { useCheckout } from '../mock-backend';
import Product from '../components/Product';

const Index = () => {
  const { inItems, outItems, buy } = useCheckout();
  const [ isNotify, setIsNotify ] = useState(false);
  const [ errMsg, setErrMsg ] = useState('');
  const notify = (msg: string) => {
    setIsNotify(true);
    setErrMsg(msg);
  };

  return (
    <main className={styles.main}>
      <h1>Store</h1>
      
      <div className="container m-auto p-4">
        {
          isNotify &&
          <div className={`${errMsg === 'Purchased successfully!' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} alert rounded-lg py-5 px-6 mb-3 text-base inline-flex items-center w-full alert-dismissible fade show`} role="alert">
            {errMsg}
          </div>
        }
        <div className="flex justify-center flex-wrap">
          {
            inItems.map(ele => <Product item={ele} buy={buy} notify={notify} key={ele.id} />)
          }
          {
            outItems.map(ele => <Product item={ele} buy={buy} notify={notify} key={ele.id} />)
          }
        </div>
      </div>
    </main>
  );
};

export default Index;
