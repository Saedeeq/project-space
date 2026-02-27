import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `projects/${timestamp}_${randomString}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      fileName: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // Check if it's a Vercel Blob configuration error
    if (error instanceof Error && error.message.includes('token')) {
      return NextResponse.json({ 
        error: 'Vercel Blob not configured. Please set BLOB_READ_WRITE_TOKEN environment variable.',
        needsSetup: true 
      }, { status: 501 });
    }
    
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
