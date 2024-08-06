import { formattedDate } from "@/lib/utils";
import { Previas } from "@/types/data";
import { InfoWindow } from "@react-google-maps/api";
import { CSSProperties } from "react";
import RequestJoinModal, { JoinModalButton } from "../forms/RequestJoinModal";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession()
  const join = searchParams.get("join");
  const isModalOpen = join === "true";


  return (
    <>
      <InfoWindow position={position} onCloseClick={onCloseClick}>
        <div style={infoWindowStyle}>
          <div className="text-secondary text-md my-2">
            <b className="text-secondary_b">{previa?.creator?.name}</b>
            {`'s Previa in`}{" "}
            <b className="text-secondary_b">{previa?.location}</b> at{" "}
            <b className="text-secondary_b">{`${formattedDate({ date: previa?.date })} at ${previa?.startTime}`}</b>
            <p className="mt-2">{previa?.description}</p>
          </div>
          <div className="flex justify-center">
            <JoinModalButton requested={previa?.join_requests?.some( join_req => join_req.user_id === session?.user.userData.user_id )} />
          </div>
        </div>
      </InfoWindow>
      {isModalOpen && <RequestJoinModal previa={previa} />}
    </>
  );
};

export default MapInfoWindow;
