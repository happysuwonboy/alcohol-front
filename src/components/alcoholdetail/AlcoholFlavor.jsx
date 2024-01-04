import FlavorLevel from "./FlavorLevel";


export default function AlcoholFlavor({flavorLevel}) {
  return (
    <div className='alcohol_flavor_container subsection_container'>
      <h4>향미그래프</h4>
      <div>
        <FlavorLevel level={flavorLevel?.sweet} flovorType={'단맛'} />
        <FlavorLevel level={flavorLevel?.sour} flovorType={'산미'} />
      </div>
      <div>
        <FlavorLevel level={flavorLevel?.soda} flovorType={'탄산'} />
        <FlavorLevel level={flavorLevel?.body} flovorType={'바디'} />
      </div>
    </div>
  );
}