function OrderForm() {
  return (
    <div className="flex items-center justify-center p-6 sm:p-12">
      <div className="mx-auto w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <form className="px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Order Details
          </h2>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Street address"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex -mx-2 mb-6">
            <div className="w-1/2 px-2">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="w-1/2 px-2">
              <input
                type="text"
                name="postcode"
                id="postcode"
                placeholder="Postcode"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 px-6 font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
