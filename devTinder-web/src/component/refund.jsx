const Refund = () => {
    return (
      <div className="min-h-screen bg-transparent text-white py-12 px-6">
        <div className="max-w-4xl mx-auto bg-opacity-10 p-8 rounded-xl shadow-lg border border-white border-opacity-20 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-6 text-center">Refund & Cancellation Policy</h1>
  
          <p className="mb-4 text-lg">
            At <strong>DevTinder</strong>, we strive to offer the best experience for developers to connect and collaborate. If you're not satisfied with a service you've paid for, we're here to help.
          </p>
  
          <h2 className="text-2xl font-semibold mt-8 mb-2">1. Cancellation Policy</h2>
          <p className="mb-4 text-base">
            You can cancel your subscription or service request within <strong>24 hours of making the payment</strong> — provided no matches or interactions have occurred. Once a connection request is accepted and communication begins, cancellations are no longer allowed.
          </p>
  
          <h2 className="text-2xl font-semibold mt-8 mb-2">2. Refund Eligibility</h2>
          <p className="mb-4 text-base">
            You may be eligible for a full refund if:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>No connection requests were accepted during your active subscription.</li>
            <li>You cancel your subscription within the 24-hour window.</li>
            <li>The service faced technical issues from our side (e.g., payment failure, server error).</li>
          </ul>
  
          <h2 className="text-2xl font-semibold mt-8 mb-2">3. Non-Refundable Cases</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>If your connection request has been accepted and conversation has started.</li>
            <li>If cancellation is requested after 24 hours of purchase.</li>
            <li>Abuse or violation of platform rules resulting in account suspension.</li>
          </ul>
  
          <h2 className="text-2xl font-semibold mt-8 mb-2">4. How to Request a Refund</h2>
          <p className="mb-4 text-base">
            To request a refund, please email us at{" "}
            <a href="mailto:janpreet3549@gmail.come-400 underline">
            janpreet3549@gmail.com
            </a>{" "}
            with your registered email, transaction ID, and reason for the request.
          </p>
  
          <p className="mt-8 text-sm text-gray-300">
            Last updated: April 19, 2025
          </p>
        </div>
      </div>
    );
  };
  
  export default Refund;
  