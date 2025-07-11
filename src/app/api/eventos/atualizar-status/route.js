import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../lib/mongodb';
import Event from '../lib/models/Event';

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Connect to database
    await dbConnect();
    
    // Parse request body
    const { eventId, status } = await request.json();
    
    if (!eventId || !status) {
      return NextResponse.json(
        { error: 'Event ID and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status
    if (!['upcoming', 'past', 'canceled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Update event status
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $set: { status } },
      { new: true }
    );
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Status updated successfully',
      event
    });
  } catch (error) {
    console.error('Error updating event status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}