import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import image from "./assets/house_img.jpg";

function PropertyCard({ property, savedProperties, handleSavedProperties }) {
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    handleSavedIndicator();
  });

  const handleSavedIndicator = () => {
    setIsSaved(false);
    savedProperties.map((savedPty) => {
      return savedPty.property_id === property.property_id && setIsSaved(true);
    });
  };
  return (
    <div className="border-2 rounded-lg bg-gray-50 shadow-sm hover:shadow-md">
      <div className="relative">
        <img
          src={
            property.photos.length < 1
              ? image
              : `https://mr0.homeflow.co.uk/${property.photos[0]}`
          }
          alt={property.display_address}
          className="rounded-lg"
        />

        <button
          className="absolute top-0 right-2"
          title="Click to bookmark this property"
          onClick={() => handleSavedProperties(property)}
        >
          <FaBookmark
            className={isSaved ? "text-red-400" : "text-yellow-400"}
            size="40"
          />
        </button>

        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">
          {property.price}
        </p>
      </div>

      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
