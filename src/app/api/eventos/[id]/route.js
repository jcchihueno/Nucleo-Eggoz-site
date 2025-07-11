import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../lib/mongodb';
import Event from '../lib/models/Event';
import mongoose from 'mongoose';

// Get a specific event by ID or slug
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    let event;
    
    // Check if ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      event = await Event.findById(id);
    } else {
      // If not a valid ObjectId, try finding by slug
      event = await Event.findOne({ slug: id });
    }
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Update an event
export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const { id } = params;
    const data = await request.json();
    
    // Remove fields that shouldn't be updated directly
    delete data._id;
    
    const event = await Event.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Delete an event
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const { id } = params;
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}