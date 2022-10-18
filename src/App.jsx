import { useState, useEffect } from "react";
import Header from "./Header";
import PropertyCard from "./PropertyCard";

function App() {
  const [properties, setProperties] = useState();
  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);
  // this state keeps track of the searched query
  const [searchedQuery, setSearchedQuery] = useState("");
  useEffect(() => {
    const fetchPropertyData = async () => {
      const response = await fetch("/property-data.json");
      const json = await response.json();

      setProperties(json.result.properties.elements);
    };

    fetchPropertyData();
  }, []);
  const handleSearch = (e) => {
    setSearchedQuery(e.toLowerCase());
  };

  const handleSavedProperties = (savedProperty) => {
    if (savedProperties.includes(savedProperty)) {
      let newArray = savedProperties.filter((property) => {
        return property.property_id !== savedProperty.property_id;
      });
      setSavedProperties(newArray);
    } else {
      setSavedProperties([...savedProperties, savedProperty]);
    }
  };

  console.log(properties);
  return (
    <div className="container mx-auto my-5">
      <div className="container fixed z-10  bg-white -mt-20 shadow-sm">
        <Header handleSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 gap-4 mt-20 pt-14 md:pt-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!!properties &&
          properties
            .filter((property) =>
              property.short_description.toLowerCase().includes(searchedQuery)
            )
            .map((property) => (
              <PropertyCard
                key={property.property_id}
                property={property}
                handleSavedProperties={handleSavedProperties}
                savedProperties={savedProperties}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
