import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: [true, "Property is required"],
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Sender is required"],
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Recipient is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    maxlength: [1000, "Message cannot be more than 1000 characters"],
  },

  status: {
    type: String,
    lowercase: true,
    trim: true,
    enum: {
      values: [
        "pending",
        "contacted",
        "resolved",
        "archived",
        "cancelled",
        "rejected",
        "approved",
      ],
      message: "{VALUE} is not a valid status",
    },
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
enquirySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes for better query performance
enquirySchema.index({ sender: 1, recipient: 1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
