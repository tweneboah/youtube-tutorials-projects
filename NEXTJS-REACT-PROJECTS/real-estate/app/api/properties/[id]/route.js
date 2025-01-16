import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Property from "@/models/property";
import { verifyToken } from "@/lib/jwt";

// Helper function to get user ID from request
const getUserFromRequest = async (request) => {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return null;
    }

    return {
      ...decoded,
      id: decoded.userId,
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

// Helper function to check ownership
const checkOwnership = (property, userId) => {
  try {
    const ownerId = property.owner._id || property.owner;
    if (typeof ownerId === "string") {
      return ownerId === userId;
    }
    // Handle MongoDB ObjectId format
    return ownerId.toString() === userId;
  } catch (error) {
    console.error("Error checking ownership:", error);
    return false;
  }
};

// Get a single property
export async function GET(request) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    await connectDB();

    const property = await Property.findById(id).populate("owner");

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ property });
  } catch (error) {
    console.error("Get property error:", error);
    return NextResponse.json(
      { error: "Error fetching property" },
      { status: 500 }
    );
  }
}

// Delete a property
export async function DELETE(request) {
  try {
    // Verify authentication
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const id = request.nextUrl.pathname.split("/").pop();
    await connectDB();

    // Find the property
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Check if the user is the owner
    if (!checkOwnership(property, user.id)) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await property.deleteOne();

    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Delete property error:", error);
    return NextResponse.json(
      { error: "Error deleting property" },
      { status: 500 }
    );
  }
}

// Update a property
export async function PATCH(request) {
  try {
    // Verify authentication
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const id = request.nextUrl.pathname.split("/").pop();
    await connectDB();

    // Find the property
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Check if the user is the owner
    if (!checkOwnership(property, user.id)) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Update the property
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "price",
      "location",
      "propertyType",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Ensure propertyType is valid
    const validPropertyTypes = [
      "House",
      "Apartment",
      "Condo",
      "Townhouse",
      "Land",
      "Commercial",
    ];
    if (!validPropertyTypes.includes(data.propertyType)) {
      return NextResponse.json(
        { error: "Invalid property type" },
        { status: 400 }
      );
    }

    // Update only allowed fields
    const allowedFields = [
      "title",
      "description",
      "price",
      "location",
      "propertyType",
      "address",
      "features",
      "status",
      "images",
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        // Ensure images is always an array
        if (field === "images") {
          updateData[field] = Array.isArray(data[field]) ? data[field] : [];
        } else {
          updateData[field] = data[field];
        }
      }
    }

    // Convert price to number if it's a string
    if (typeof updateData.price === "string") {
      updateData.price = parseFloat(updateData.price);
    }

    // Ensure at least one image exists
    if (updateData.images && updateData.images.length === 0) {
      updateData.images = [
        "https://placehold.co/800x600/e2e8f0/1e293b.png?text=Property+Image",
      ];
    }

    // Update the property with the validated data
    Object.assign(property, updateData);
    await property.save();

    // Return the updated property
    const updatedProperty = await Property.findById(id)
      .populate("owner", "name email")
      .lean();

    return NextResponse.json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Update property error:", error);
    return NextResponse.json(
      { error: "Error updating property: " + error.message },
      { status: 500 }
    );
  }
}
