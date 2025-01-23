import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { uploadImage } from "@/lib/uploadImage";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const formData = await request.formData();

    // Extract data from FormData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Upload image if provided
    let imageUrl = "";
    if (imageFile) {
      try {
        console.log("Uploading image...");
        imageUrl = await uploadImage(imageFile);
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
          { error: "Failed to upload image. Please try again." },
          { status: 500 }
        );
      }
    }

    // Create new project
    try {
      console.log("Creating project with data:", {
        title,
        description,
        githubUrl,
        liveUrl,
        imageUrl,
      });

      const project = await Project.create({
        title,
        description,
        githubUrl: githubUrl || "",
        liveUrl: liveUrl || "",
        image: imageUrl,
      });

      console.log("Project created successfully:", project);

      return NextResponse.json(project, { status: 201 });
    } catch (error) {
      console.error("Error creating project in database:", error);
      return NextResponse.json(
        { error: "Failed to save project to database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in project creation:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
