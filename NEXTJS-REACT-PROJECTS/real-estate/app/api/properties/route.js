import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Property from "@/models/property";
import User from "@/models/user"; // Import the User model
import { verifyToken } from "@/lib/jwt";

// Helper function to verify auth
async function verifyAuth(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return { error: "Please login to access this resource", status: 401 };
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return { error: "Invalid or expired token", status: 401 };
    }

    // Check if we have userId or id in the token
    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return { error: "Invalid token format", status: 401 };
    }

    // Verify the user exists
    const user = await User.findById(userId).select("_id");
    if (!user) {
      return { error: "User not found", status: 401 };
    }

    return { userId: user._id.toString() };
  } catch (error) {
    console.error("Auth verification error:", error);
    return { error: "Authentication failed", status: 401 };
  }
}

// Get all properties with filtering, searching and pagination
export async function GET(request) {
  try {
    await connectDB();

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 9;
    const search = searchParams.get("search") || "";
    const propertyType = searchParams.get("propertyType") || "";
    const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
    const maxPrice =
      parseFloat(searchParams.get("maxPrice")) || Number.MAX_VALUE;
    const location = searchParams.get("location") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // Build query
    let query = {};

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by property type
    if (propertyType) {
      query.propertyType = propertyType;
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by price range
    query.price = { $gte: minPrice, $lte: maxPrice };

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sortObject = {};
    sortObject[sortBy] = order === "asc" ? 1 : -1;

    // Get total count for pagination
    const total = await Property.countDocuments(query);

    // Get properties with pagination and sorting
    const properties = await Property.find(query)
      .populate("owner", "name email")
      .sort(sortObject)
      .skip(skip)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      properties,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Error fetching properties" },
      { status: 500 }
    );
  }
}

// Create a new property
export async function POST(request) {
  try {
    const auth = await verifyAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    await connectDB();

    // Parse the request body
    const body = await request.json();

    // Create the property data with owner explicitly set
    const propertyData = {
      ...body,
      owner: auth.userId, // Use the verified user ID
      images: body.images?.length
        ? body.images
        : [
            "https://placehold.co/800x600/e2e8f0/1e293b.png?text=Property+Image",
          ],
    };

    console.log("Creating property with data:", propertyData);

    // Create and populate the property
    const property = await Property.create(propertyData);
    const populatedProperty = await Property.findById(property._id)
      .populate("owner", "name email phone")
      .lean();

    console.log("Created property:", populatedProperty);

    return NextResponse.json({ property: populatedProperty }, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Error creating property: " + error.message },
      { status: 500 }
    );
  }
}
