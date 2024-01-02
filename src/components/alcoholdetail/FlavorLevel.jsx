

export default function FlavorLevel({flovorType}) {
const level = 4;

  return (
    <div className="flavor_level">
      <span>{flovorType}</span>
      <div className="graph">
        {Array.from({length : 5}).map((_,idx) => 
            <span className={`lv${idx+1} ${idx+1 <= level ? 'fill' : ''}`}></span>
        )}
      </div>
    </div>
  );
}
