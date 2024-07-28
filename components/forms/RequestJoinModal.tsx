"use client";
import { requestJoin } from "@/lib/actions";
import { intentionsValues } from "@/lib/data";
import { Previas } from "@/types/data";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { CustomButton } from "../buttons/CustomButton";
import CustomDropDowns from "../customComponents/CustomDropDown";
import CustomInput from "../customComponents/CustomInput";
import CustomPhotoUploader from "../customComponents/CustomPhotoUploader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleQueryParams } from "@/lib/utils";

type RequestJoinModalProps = {
  previa: Previas;
};

export default function RequestJoinModal({ previa }: RequestJoinModalProps) {
  const { creator, previa_id, location, startTime } = previa;
  const requestJoinWithId = requestJoin.bind(null, previa_id || "");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleModalClose = () =>
    handleQueryParams({
      searchParams,
      pathname,
      replace,
      query: "join",
    });

  const handleRequestJoin = async (formData: FormData) => {
    const res = await requestJoinWithId(undefined, formData);
    toast.dismiss();
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Request sent!");
    }
    handleModalClose();
  };

  const handleBackdropClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleQueryParams({
        searchParams,
        pathname,
        replace,
        query: "join",
      });
    }
  };

  return (
    <>
      {/*      <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      >
      <div
        className="p-6 rounded-lg max-w-3xl w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        >
        <div className="bg-primary_b max-w-full min-h-full my-4 px-8 py-4 mx-auto rounded-md">
          <span
            className="flex justify-end my-2 text-secondary text-xl cursor-pointer font-bold hover:text-primary"
            onClick={handleModalClose}
            >
            <FaTimes />
          </span>
          <div className="text-secondary text-md my-2">
            <b className="text-secondary_b">{creator?.name}</b>
            {`'s Previa in`} <b className="text-secondary_b">{location}</b> at{' '}
            <b className="text-secondary_b">{startTime}</b>
          </div>
          <form action={handleRequestJoin} className="flex flex-col gap-3 px-6">
            <CustomInput
              name="attendants"
              label="How many are there?"
              type="number"
              required
              />
            <div className="w-50 my-3 flex flex-col">
              <CustomDropDowns
                name="intentions"
                label="What are you looking htmlFor?"
                values={intentionsValues}
                type="select"
                />
            </div>
            <div className="col-span-3 lg:col-span-1">
              <div className="flex flex-wrap justify-center items-center gap-2">
                <div className="text-secondary">
                  <CustomPhotoUploader label="Take a photo" name="url_img" />
                </div>
              </div>
            </div>
            <button className="mt-4 col-span-3" type="submit">
              <CustomButton text="Join" />
            </button>
          </form>
        </div>
      </div>
    </div>
 */}
      <div
        id="crud-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleBackdropClick}
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/*   <!-- Modal content --> */}
          <div className="relative bg-primary_b rounded-lg shadow ">
            {/*  <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-secondary ">
                Send Join Request
              </h3>
              <button
                type="button"
                className="text-secondary bg-transparent cursor-pointer hover:text-primary rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
                onClick={handleModalClose}
              >
                <FaTimes />
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5" action={handleRequestJoin}>
              <div className="text-secondary text-md my-2">
                <b className="text-secondary_b">{creator?.name}</b>
                {`'s Previa in`} <b className="text-secondary_b">{location}</b>{" "}
                at <b className="text-secondary_b">{startTime}</b>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <CustomInput
                    name="attendants"
                    label="How many are there?"
                    type="number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <CustomDropDowns
                    name="intentions"
                    label="What are you looking for?"
                    values={intentionsValues}
                    type="select"
                  />
                </div>
                <div className="col-span-2">
                  <div className="text-secondary flex w-full justify-center">
                    <CustomPhotoUploader label="Take a photo" name="url_img" />
                  </div>
                </div>
                <div className="col-span-2"></div>
              </div>
              <CustomButton text="Join" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export const JoinModalButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleModalOpen = () =>
    handleQueryParams({
      value: "true",
      searchParams,
      pathname,
      replace,
      query: "join",
    });

  return (
    <button className={"btn-primary"} onClick={handleModalOpen}>
      Join
    </button>
  );
};
