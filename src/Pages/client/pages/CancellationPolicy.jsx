import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      {/* <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-500">GRABIX</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Customer Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">About Us</a></li>
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Cancellation Policy Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4 text-orange-500">Cancellation Policy</h1>
          <p className="text-gray-600 mb-2">The customer can choose to cancel an order any time before it's dispatched. The order cannot be canceled once it’s out for delivery. However, the customer may choose to reject it at the doorstep.</p>
          <p className="text-gray-600 mb-2">The time window for cancellation varies based on different categories, and the order cannot be canceled once the specified time has passed.</p>
          <p className="text-gray-600 mb-2">In some cases, the customer may not be allowed to cancel the order for free, post the specified time, and a <span className="text-orange-500 font-semibold">cancellation fee</span> will be charged. The details about the time window mentioned on the product page or order confirmation page will be considered final.</p>
          <p className="text-gray-600 mb-2">In case of any cancellation from the seller due to unforeseen circumstances, a <span className="text-orange-500 font-semibold">full refund</span> will be initiated for prepaid orders.</p>
          <p className="text-gray-600"><span className="text-orange-500 font-semibold">Grabix</span> reserves the right to accept the cancellation of any order. <span className="text-orange-500 font-semibold">Grabix</span> also reserves the right to waive off or modify the time window or cancellation fee from time to time.</p>
        </section>

        {/* Return Policy Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-orange-500">Return Policy</h1>
          <p className="text-gray-600 mb-2">Returns is a scheme provided by respective sellers directly under this policy in terms of which the option of <span className="text-orange-500 font-semibold">exchange</span>, <span className="text-orange-500 font-semibold">replacement</span>, and/or <span className="text-orange-500 font-semibold">refund</span> is offered by the respective sellers to you.</p>
          <p className="text-gray-600 mb-2">All products listed under a particular category may not have the same returns policy. For all products, the returns/replacement policy provided on the product page shall prevail over the general returns policy.</p>
          
          {/* Table */}
          <h2 className="text-xl font-semibold mb-2 text-orange-500">Categories, Return Window, and Conditions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border text-left">Category</th>
                  <th className="p-2 border text-left">Returns Window</th>
                  <th className="p-2 border text-left">Conditions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">All Mobiles (except Apple, Google, etc.), Electronics (Tablets, Laptops, Smart Watches)</td>
                  <td className="p-2 border">10 Days</td>
                  <td className="p-2 border">Replacement only. Defects must be confirmed within the return window.</td>
                </tr>
                <tr>
                  <td className="p-2 border">Apple, Google, Motorola, Electronics (specific brands)</td>
                  <td className="p-2 border">10 Days</td>
                  <td className="p-2 border">Service Center Replacement/Repair only based on brand policies.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Return Policies */}
          <h3 className="text-lg font-semibold mt-4 mb-2 text-orange-500">Additional Return Policies</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>If a seller cannot process a replacement, a <span className="text-orange-500 font-semibold">refund</span> will be issued.</li>
            <li>Missing/damaged accessories may be replaced or refunded (via <span className="text-orange-500 font-semibold">eGV</span>).</li>
            <li>For Grabix-provided installation services, do not unbox products yourself. Authorized personnel will assist.</li>
          </ul>
          <p className="text-gray-600 mt-4"><span className="text-orange-500 font-semibold">Grabix</span> holds the right to restrict the number of returns per order after evaluating product defects.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-xl font-bold">GRABIX</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-orange-500">Home</a></li>
              <li><a href="#" className="hover:text-orange-500">Customer Support</a></li>
              <li><a href="#" className="hover:text-orange-500">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500">Download App</a></li>
            </ul>
          </nav>
        </div>
        <div className="text-center text-gray-400 py-2">
          &copy; Designed by Wolgan
        </div>
      </footer>
    </div>
  );
};

export default CancellationPolicy;
