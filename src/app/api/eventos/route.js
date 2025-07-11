import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../lib/mongodb';
import Event from '../lib/models/Event';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (status === 'upcoming') {
      query.status = 'upcoming';
    } else if (status === 'past') {
      query.status = 'past';
    }
    
    // Execute query with pagination
    const events = await Event.find(query)
      .sort({ date: status === 'past' ? -1 : 1 })
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

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
    const data = await request.json();
    
    // Generate slug if not provided
    if (!data.slug) {
      data.slug = Event.generateSlug(data.title);
    }
    
    // Add creator reference
    data.createdBy = session.user.id;
    
    // Create new event
    const event = await Event.create(data);
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json(
        { error: 'Um evento com este slug já existe. Por favor, use um título diferente.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}