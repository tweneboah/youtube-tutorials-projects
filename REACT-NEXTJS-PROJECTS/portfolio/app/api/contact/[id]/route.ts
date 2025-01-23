import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Delete message
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await Message.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Message deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting message" },
      { status: 500 }
    );
  }
}

// Toggle read status
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const message = await Message.findById(params.id);
    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    message.read = !message.read;
    await message.save();

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating message" },
      { status: 500 }
    );
  }
}
