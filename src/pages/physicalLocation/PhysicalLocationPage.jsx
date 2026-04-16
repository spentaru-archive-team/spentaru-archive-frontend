import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import PhysicalLocationHeader from "./PhysicalLocationHeader";
import PhysicalLocationCard from "./PhysicalLocationCard";

const physicalLocations = [
  {
    id: "1",
    name: "Lemari 1",
    racks: [
      {
        id: "1",
        rack_number: 1,
        capacity: 20,
        capacity_used: 10,
      },
      {
        id: "2",
        rack_number: 2,
        capacity: 20,
        capacity_used: 5,
      },
      {
        id: "3",
        rack_number: 3,
        capacity: 20,
        capacity_used: 15,
      },
      {
        id: "4",
        rack_number: 4,
        capacity: 20,
        capacity_used: 0,
      },
    ],
  },
  {
    id: "2",
    name: "Lemari 2",
    racks: [
      {
        id: "5",
        rack_number: 1,
        capacity: 20,
        capacity_used: 20,
      },
      {
        id: "6",
        rack_number: 2,
        capacity: 20,
        capacity_used: 10,
      },
      {
        id: "7",
        rack_number: 2,
        capacity: 20,
        capacity_used: 10,
      },
      {
        id: "8",
        rack_number: 2,
        capacity: 20,
        capacity_used: 10,
      },
    ],
  },
  {
    id: "3",
    name: "Lemari 3",
    racks: [
      {
        id: "9",
        rack_number: 1,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "10",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "11",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "12",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
    ],
  },
  {
    id: "4",
    name: "Lemari 4",
    racks: [
      {
        id: "13",
        rack_number: 1,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "14",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "15",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
      {
        id: "16",
        rack_number: 2,
        capacity: 20,
        capacity_used: 0,
      },
    ],
  },
];

export default function PhysicalLocationPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="space-y-6">
      <PhysicalLocationHeader />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {physicalLocations.map((cabinet) => (
          <PhysicalLocationCard key={cabinet.id} cabinet={cabinet} />
        ))}
      </div>
    </section>
  );
}
