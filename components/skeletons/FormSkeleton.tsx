
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

const FormSkeleton = () => (
    <div className={` ${shimmer} grid place-items-center h-screen mx-2 `}>
    <div className="bg-secondary_b shadow-lg text-black rounded-lg border-t-4">
      <div className="w-full h-64 relative mb-6">
        <div className="w-48 aspect-square" />
      </div>
      <div className="p-5 gap-3 ">
        <h1 className=" text-4xl text-primary font-bold text-center mb-2">
        </h1>
        <p className="text-center mb-6 text-secondary">
        </p>
        <div className="flex flex-col gap-3 px-6">
       
        </div>
      </div>
    </div>
  </div>
)

export default FormSkeleton

