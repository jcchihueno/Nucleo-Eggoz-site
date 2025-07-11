import { NextResponse } from 'next/server';
import dbConnect from '../lib/mongodb';
import Contact from '../lib/models/Contact';
import { getServerSession } from 'next-auth';

// Save a new contact message
export async function POST(request) {
  try {
    await dbConnect();
    
    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }
    
    // Create new contact entry
    const contact = await Contact.create(data);
    
    // In a real application, you might want to send notification emails here
    
    return NextResponse.json(
      { success: true, message: 'Contact message received' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Get all contacts (admin only)
export async function GET(request) {
  try {
    // Check admin authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;
    const status = searchParams.get('status'); // 'read', 'unread', 'archived'
    
    // Build query
    const query = {};
    if (status === 'read') {
      query.read = true;
      query.archived = false;
    } else if (status === 'unread') {
      query.read = false;
      query.archived = false;
    } else if (status === 'archived') {
      query.archived = true;
    }
    
    // Execute query
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Contact.countDocuments(query);
    
    return NextResponse.json({
      contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}