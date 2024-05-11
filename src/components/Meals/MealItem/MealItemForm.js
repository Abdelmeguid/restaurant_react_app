import { useRef, useState,useContext, useEffect } from 'react';


import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import CartContext from "../../../store/cart-context";


const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();
  const cartCtx = useContext(CartContext);

  console.log(cartCtx.defaultamount);


 
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
    
  
  };

  useEffect( ()=>{
    if(cartCtx.defaultamount){
      amountInputRef.current.value ='1';
    }
  },[cartCtx.defaultamount])

 
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue:'1',
        
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
