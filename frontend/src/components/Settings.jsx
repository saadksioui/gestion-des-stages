
const Settings = () => {
  return (
    <div className="absolute z-10 top-32 bg-[#f9f9f8] right-4 w-1/4 h-fit rounded-lg shadow-md px-10 py-5 font-poppins">
      <h1 className="text-center text-3xl font-semibold pb-3 border-b-[1px] border-black">Settings</h1>
      <form className="mt-4">
        <div className="p-3 flex flex-col gap-2">
          <label htmlFor="titreStage" className="text-xl font-medium">Old Password:</label>
          <input type="text" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <label htmlFor="titreStage" className="text-xl font-medium">New Password:</label>
          <input type="text" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <label htmlFor="titreStage" className="text-xl font-medium">Confirm Password:</label>
          <input type="text" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
        </div>
        <div className="p-3">
          <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center w-full mt-2 text-lg">
            Modifier
          </button>
        </div>
      </form>
    </div>
  )
};

export default Settings
