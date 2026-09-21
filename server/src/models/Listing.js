import mongoose from 'mongoose';

// TODO: define the Listing schema per README.md section 1.

const listingSchema = new mongoose.Schema(
  {
    // TODO
  },
  { timestamps: true }
);

export const Listing = mongoose.model('Listing', listingSchema);
