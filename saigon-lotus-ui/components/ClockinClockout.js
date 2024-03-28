export default function ClockinClockOut({
  handleSecondSubmit,
  handleSelectionChange,
  isCancelButtonClicked,
}) {
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSecondSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Pick your choice!
                    </h3>
                    <div className="flex items-center"></div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        value="clock-in"
                        className="flex items-center py-2.5 px-9 text-sm font-medium 
                              text-gray-900 focus:outline-none bg-white rounded-full border 
                              border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
                              focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                              dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={handleSelectionChange}
                      >
                        clock-in
                      </button>
                      <button
                        type="button"
                        value="clock-out"
                        className="flex items-center py-2.5 px-9 text-sm font-medium 
                              text-gray-900 focus:outline-none bg-white rounded-full border 
                              border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
                              focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                              dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={handleSelectionChange}
                      >
                        clock-out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={isCancelButtonClicked}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
