import OrderContent from './OrderContent';

export default function StickyOrderMenu({alcohol}) {

  return (
    <div className='sticky_container'>
      <OrderContent alcohol={alcohol}></OrderContent>
    </div>
  );
}