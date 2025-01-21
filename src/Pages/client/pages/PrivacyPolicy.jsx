import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='bg-gray-50 text-gray-800 min-h-screen px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-6 text-center text-orange-500'>
          Privacy Policy
        </h1>

        <p className='mb-4'>
          At <strong>Grabix</strong>, your privacy is important to us. This
          Privacy Policy outlines how we collect, use, and safeguard your
          personal information.
        </p>

        {/* Section 1 */}
        <h2 className='text-2xl font-semibold mt-6 mb-2'>
          Information Collection
        </h2>
        <p className='mb-4'>
          We collect information when you visit our website, sign up for
          services, or interact with our content. The types of data may include:
        </p>
        <ul className='list-disc ml-6 mb-4'>
          <li>Your name, email address, and contact details</li>
          <li>Browsing behavior, cookies, and IP addresses</li>
          <li>Transactional data when you purchase services</li>
        </ul>

        {/* Section 2 */}
        <h2 className='text-2xl font-semibold mt-6 mb-2'>
          How We Use Your Information
        </h2>
        <p className='mb-4'>
          The collected data helps us improve our services and ensure a better
          experience. Key uses include:
        </p>
        <ul className='list-disc ml-6 mb-4'>
          <li>Personalizing content and improving our platform</li>
          <li>Sending updates, newsletters, and promotional offers</li>
          <li>Ensuring security and fraud prevention</li>
        </ul>

        {/* Section 3 */}
        <h2 className='text-2xl font-semibold mt-6 mb-2'>
          Sharing of Information
        </h2>
        <p className='mb-4'>
          We do not sell your personal information. However, we may share data
          with:
        </p>
        <ul className='list-disc ml-6 mb-4'>
          <li>Third-party service providers for operational purposes</li>
          <li>Legal authorities when required by law</li>
        </ul>

        {/* Section 4 */}
        <h2 className='text-2xl font-semibold mt-6 mb-2'>Your Rights</h2>
        <p className='mb-4'>
          You have the right to access, update, or delete your personal data.
          Contact us at{' '}
          <a
            href='mailto:support@grabix.in'
            className='text-yellow-500 hover:underline'
          >
            support@grabix.in
          </a>{' '}
          for assistance.
        </p>

        {/* Footer */}
        <p className='mt-8 text-sm text-gray-500'>
          This Privacy Policy is effective as of January 2024. Any changes will
          be communicated through our website.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
