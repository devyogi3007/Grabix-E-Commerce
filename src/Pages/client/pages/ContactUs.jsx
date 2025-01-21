import React from 'react';

const ContactPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-blue-600 text-white py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                </div>
            </header>

            <main className="container mx-auto py-10 px-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-4">
                        We are here to help! For any inquiries, feedback, or support, please reach out to us at:
                    </p>
                    <p className="text-blue-600 font-medium text-lg">
                        <a href="mailto:support@grabix.in">support@grabix.in</a>
                    </p>
                    {/* <p className="text-gray-600 mt-4">We aim to respond to all queries within 24 hours.</p> */}
                </div>
            </main>

            <footer className="bg-gray-200 py-6 mt-10">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600 text-sm">&copy; 2025 Grabix TechSolutions Pvt Ltd. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ContactPage;