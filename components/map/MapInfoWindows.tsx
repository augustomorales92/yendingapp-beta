import { formattedDate } from "@/lib/utils";
import { Previas } from "@/types/data";
import { InfoWindow } from "@react-google-maps/api";
import { CSSProperties } from "react";
import RequestJoinModal, { JoinModalButton } from "../forms/RequestJoinModal";
import { useSearchParams } from "next/navigation";

interface CustomInfoWindowProps {
  position: google.maps.LatLngLiteral;
  onCloseClick: () => void;
  previa?: Previas;
}

const infoWindowStyle: CSSProperties = {
  background: "white",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

const MapInfoWindow: React.FC<CustomInfoWindowProps> = ({
  position,
  onCloseClick,
  previa,
}) => {
  const searchParams = useSearchParams();
  const join = searchParams.get("join");
  const isModalOpen = join === "true";

  return (
    <>
      <InfoWindow position={position} onCloseClick={onCloseClick}>
        <div style={infoWindowStyle}>
          <h3>{previa?.description}</h3>
          <p>
            {`${formattedDate({ date: previa?.date })} at ${previa?.startTime}`}
          </p>
          <JoinModalButton />
        </div>
      </InfoWindow>
      {isModalOpen && <RequestJoinModal previa={previa} />}
    </>
  );
};

export default MapInfoWindow;
