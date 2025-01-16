'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Alert from '@/components/ui/Alert';

export default function EnquiriesPage() {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchEnquiries();
    }
  }, [user]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const res = await fetch('/api/enquiries', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch enquiries');
      }

      setEnquiries(data.enquiries);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setError(error.message || 'Error fetching enquiries');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Alert
            type="info"
            message="Please login to view your enquiries"
            className="mb-4 inline-block"
          />
          <Link
            href="/login"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="large" />
          <p className="text-gray-600">Loading your enquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          type="error"
          message={error}
          onClose={() => setError('')}
          autoClose={true}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Enquiries</h1>
      
      {enquiries.length === 0 ? (
        <div className="text-center">
          <Alert
            type="info"
            message="You don't have any enquiries yet"
            className="inline-block"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={enquiry.property.images[0] || '/placeholder.jpg'}
                    alt={enquiry.property.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link
                        href={`/properties/${enquiry.property._id}`}
                        className="text-xl font-semibold hover:text-blue-600"
                      >
                        {enquiry.property.title}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      enquiry.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : enquiry.status === 'replied'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-semibold">From: </span>
                        {enquiry.sender?.name || 'N/A'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Email: </span>
                        {enquiry.sender?.email || 'N/A'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Message: </span>
                        {enquiry.message}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>
                      {user._id === enquiry.sender._id ? (
                        <>
                          <span>Sent to: </span>
                          <span className="font-medium">{enquiry.recipient?.name || 'N/A'}</span>
                        </>
                      ) : (
                        <>
                          <span>From: </span>
                          <span className="font-medium">{enquiry.sender?.name || 'N/A'}</span>
                        </>
                      )}
                    </div>
                    <div>
                      {user._id === enquiry.sender._id ? (
                        <span>You sent this enquiry</span>
                      ) : (
                        <Link
                          href={`mailto:${enquiry.sender?.email}`}
                          className="text-blue-500 hover:text-blue-600 inline-flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Reply via Email
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
