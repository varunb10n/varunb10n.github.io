import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";

// Last 15 data source
const URL =
  "https://gist.githubusercontent.com/varunb10n/9282b51acf83593a63996eff655837d2/raw/last15.csv";

const MapLayer = () => {
  const mapContainer = useRef(null);
  const map = useRef<null | L.Map>(null);
  const center = { lat: 23.933879, lng: 78.778422 };
  const [zoom] = useState(5);

  const { data, isLoading, error } = useQuery({
    queryKey: ["last15"],
    queryFn: async () => {
      const res = await fetch(URL);
      const text = await res.text();
      const result = Papa.parse(text, {
        header: true, // parses rows into objects using the first line as keys
        skipEmptyLines: true,
      });
      return result.data; // now an array of objects
    },
  });

  useEffect(() => {
    if (map.current || mapContainer.current === null) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom,
    });

    const tileLayer = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tileLayer.addTo(map.current);
  }, [center.lat, center.lng, data, zoom]);

  if (error) {
    return <small>Error while loading data!</small>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <article className="relative w-full h-screen">
      <article ref={mapContainer} className="absolute w-full h-full"></article>
    </article>
  );
};

const CartoStyling = () => {
  return (
    <section>
      <MapLayer />
    </section>
  );
};

export default CartoStyling;
