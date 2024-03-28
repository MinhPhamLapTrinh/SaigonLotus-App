export default function UniqueNumberModal(props) {
  // Array of numbers
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
            <form onSubmit={props.handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Enter your unique number.
                    </h3>
                    <div className="flex items-center">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id={props.uniqueNumber}
                        value={props.uniqueNumber}
                        placeholder="Your unique number"
                        readOnly
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[...numbers].map((number) => (
                        <button
                          key={number + 1}
                          type="button"
                          className="py-2.5 px-5 text-sm font-medium 
                              text-gray-900 focus:outline-none bg-white rounded-full border 
                              border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
                              focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                              dark:hover:text-white dark:hover:bg-gray-700"
                          onClick={() =>
                            props.isHandleNumberChangeClicked(String(number + 1))
                          }
                        >
                          {number + 1}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="flex items-center py-2.5 px-5 text-sm font-medium 
                              text-gray-900 focus:outline-none bg-white rounded-full border 
                              border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
                              focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                              dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => props.isHandleNumberChangeClicked("0")}
                      >
                        0
                      </button>
                      <button
                        type="button"
                        className="py-2.5 px-5 text-sm font-medium 
                              text-gray-900 focus:outline-none bg-white rounded-full border 
                              border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
                              focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                              dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => props.isRemoveDigitClicked()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
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
                  onClick={props.isCancelClicked}
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
