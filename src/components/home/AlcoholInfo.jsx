export default function AlcoholInfo({ name, price, hashtag, sale }) {
  const originPrice = price.toLocaleString();
  const salePriceCalc = price - price * (sale / 100);
  const salePrice = salePriceCalc.toLocaleString();

  console.log(price);

  return (
    <div className='alcohol_info'>
      <p>{name}</p>
      {sale === 0 || <p className='origin_price'>{originPrice}원</p>}
      {/* <p>{originPrice}원</p> */}
      <p className='sale_price'>{sale === 0 ? null : <span className='sale'>{sale}% </span>}{salePrice}<span>원</span></p>
      <div>
        <figcaption><img src='/assets/images/home/star.png' alt='' /></figcaption>
        <p>4.0</p>
      </div>
      <p>#{hashtag}</p>
    </div>
  );
};