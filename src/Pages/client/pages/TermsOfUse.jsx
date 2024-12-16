import React from "react";

const TermsOfUse = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      {/* <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-yellow-500">GRABIX</h1>
          <nav>
            <a
              href="/"
              className="text-gray-600 hover:text-yellow-500 transition duration-300"
            >
              Home
            </a>
          </nav>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Terms of Use
        </h2>

        {/* Section 1: General Terms */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            1. General Terms
          </h3>
          <p className="leading-relaxed">
            These Terms of Service govern your use of the Grabix website and all
            associated services, content, and products. Grabix reserves the
            right to modify or update these terms at any time without prior
            notice. Continued use of the website after changes indicates your
            acceptance of the revised terms.
          </p>
        </section>

        {/* Section 2: Eligibility */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            2. Eligibility
          </h3>
          <p className="leading-relaxed">
            By using this website, you confirm that you are at least 18 years
            old or accessing it under the supervision of a parent or guardian.
          </p>
        </section>

        {/* Section 3: Products and Pricing */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            3. Products and Pricing
          </h3>
          <p className="leading-relaxed">
            All product descriptions, prices, and availability are subject to
            change at any time without notice. While we strive to ensure
            accuracy, Grabix reserves the right to cancel orders affected by any
            errors.
          </p>
        </section>

        {/* Section 4: Orders and Payment */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            4. Orders and Payment
          </h3>
          <ul className="list-disc pl-6 leading-relaxed">
            <li>
              By placing an order, you agree to provide accurate and complete
              information.
            </li>
            <li>
              All payments must be made via the methods available on the
              website.
            </li>
            <li>
              Grabix reserves the right to cancel or refuse orders for any
              reason, including suspected fraudulent activity.
            </li>
          </ul>
        </section>

        {/* Section 5: Shipping and Delivery */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            5. Shipping and Delivery
          </h3>
          <p className="leading-relaxed">
            Delivery timelines are estimates and may vary based on destination
            and circumstances beyond our control. For detailed information,
            please refer to our Shipping Policy.
          </p>
        </section>

        {/* Section 6: Returns and Refunds */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            6. Returns and Refunds
          </h3>
          <p className="leading-relaxed">
            Please review our Return and Refund Policy to understand the
            procedures and conditions for returning items and obtaining refunds.
          </p>
        </section>

        {/* Section 7: Intellectual Property */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            7. Intellectual Property
          </h3>
          <p className="leading-relaxed">
            All content on this website, including images, text, logos, and
            designs, is owned by or licensed to Grabix and is protected by
            copyright and intellectual property laws. You may not reproduce or
            redistribute any part of the website without prior written consent.
          </p>
        </section>

        {/* Section 8: User Conduct */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            8. User Conduct
          </h3>
          <ul className="list-disc pl-6 leading-relaxed">
            <li>Do not violate any applicable laws or regulations.</li>
            <li>Do not submit false or misleading information.</li>
            <li>Do not interfere with the website’s functionality or security.</li>
          </ul>
        </section>

        {/* Section 9-12 */}
        <section className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            9. Limitation of Liability
          </h3>
          <p className="leading-relaxed">
            Grabix is not liable for any direct, indirect, incidental, or
            consequential damages arising from your use of the website or its
            products.
          </p>
          <h3 className="text-2xl font-semibold text-yellow-500 mt-6 mb-4">
            10. Indemnification
          </h3>
          <p className="leading-relaxed">
            You agree to indemnify and hold Grabix harmless from any claims or
            damages resulting from your breach of these Terms of Service.
          </p>
          <h3 className="text-2xl font-semibold text-yellow-500 mt-6 mb-4">
            11. Governing Law
          </h3>
          <p className="leading-relaxed">
            These Terms of Service are governed by the laws of your jurisdiction
            and any disputes will be resolved in the appropriate courts.
          </p>
          <h3 className="text-2xl font-semibold text-yellow-500 mt-6 mb-4">
            12. Contact Information
          </h3>
          <p className="leading-relaxed">
            If you have any questions or concerns, contact us at{" "}
            <a
              href="mailto:info@grabix.in"
              className="text-yellow-500 hover:underline"
            >
              info@grabix.in
            </a>
            .
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} GRABIX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfUse;
