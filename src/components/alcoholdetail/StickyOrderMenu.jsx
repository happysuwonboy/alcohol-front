import OrderContent from './OrderContent';

export default function StickyOrderMenu({alcohol, qty, setQty}) {

  return (
    <div className='sticky_container'>
      <OrderContent alcohol={alcohol} qty={qty} setQty={setQty} />
    </div>
  );
}