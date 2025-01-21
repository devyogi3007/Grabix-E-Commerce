import React from 'react';

const ShippingPolicy = () => {
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
        {/* Shipping Policy Section */}
        <section className="bg-white shadow-md rounded-lg p-10 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-orange-500">Shipping Policy</h1>
          <p className="text-gray-600 text-lg mb-6">
            Welcome to <span className="text-orange-500 font-semibold">Grabix</span>. We aim to ensure that your orders are delivered to you in a timely and efficient manner. This policy outlines our shipping processes, costs, and delivery timelines.
          </p>
          
          {/* Order Processing Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Order Processing</h2>
            <ul className="list-disc list-inside text-gray-600 text-lg">
              <li>All orders are processed within <span className="text-orange-500 font-semibold">12–24 hours</span> after ordering.</li>
              <li>Processing times may vary during peak seasons or due to unforeseen circumstances.</li>
            </ul>
          </div>

          {/* Shipping Methods and Costs Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Shipping Methods and Costs</h2>
            <p className="text-gray-600 text-lg mb-4">
              We are currently <span className="text-orange-500 font-semibold">Shipping free</span>. We are currently Shipping free. We aim to deliver the order within a minimum time period of 12 hours to a maximum time period of 24 hours after ordering depending on the size of the product.
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Note:</span> Shipping times may vary during peak seasons or due to unforeseen circumstances.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white mt-8">
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
          &copy; &nbsp; <b>GRABIX TECHSOLUTIONS PVT LTD</b>
        </div>
      </footer> */}
    </div>
  );
};

export default ShippingPolicy;
