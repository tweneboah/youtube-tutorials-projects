import { Suspense } from "react";
import PropertyDetailsClient from "./PropertyDetailsClient";
import connectDB from "@/lib/db";
import Property from "@/models/property";
import User from "@/models/user";
import Enquiry from "@/models/enquiry";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

async function getPropertyWithEnquiries(id) {
  try {
    await connectDB();

    console.log("Fetching property with ID:", id);

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid property ID format");
    }

    // Find property and populate owner data in one query
    const property = await Property.findById(id)
      .populate({
        path: "owner",
        model: User,
        select: "name email phone",
      })
      .lean();

    console.log("Found property with populated owner:", property);

    if (!property) {
      throw new Error("Property not found");
    }

    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    let userId = null;

    if (token) {
      try {
        const decoded = verifyToken(token.value);
        userId = decoded.userId || decoded.id;
      } catch (error) {
        console.error("Token verification error:", error);
      }
    }

    // Get enquiries count only if the user is the owner
    let enquiriesCount = 0;
    if (userId && property.owner && property.owner._id.toString() === userId) {
      enquiriesCount = await Enquiry.countDocuments({ property: id });
    }

    // Prepare the response, handling the case where owner might be null
    const propertyObj = {
      ...JSON.parse(JSON.stringify(property)),
      owner: property.owner
        ? {
            _id: property.owner._id.toString(),
            name: property.owner.name,
            email: property.owner.email,
            phone: property.owner.phone,
          }
        : null,
      enquiriesCount,
    };

    console.log("Final property object:", propertyObj);
    return propertyObj;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
}

export async function generateMetadata({ params: { id } }) {
  try {
    const property = await getPropertyWithEnquiries(id);
    return {
      title: property.title,
      description: property.description,
    };
  } catch (error) {
    return {
      title: "Property Details",
      description: "View property details",
    };
  }
}

export default async function PropertyDetailsPage({ params: { id } }) {
  const property = await getPropertyWithEnquiries(id);
  console.log("Property Data:", property);

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 text-center">
          Loading property details...
        </div>
      }
    >
      <PropertyDetailsClient initialProperty={property} />
    </Suspense>
  );
}
