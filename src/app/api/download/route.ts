import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const file = searchParams.get('file');
    const url = searchParams.get('url');

    // If a full URL is provided (Vercel Blob), redirect to it
    if (url) {
      return NextResponse.redirect(url);
    }

    if (!file) {
      return NextResponse.json({ error: 'No file specified' }, { status: 400 });
    }

    // For Vercel Blob URLs, redirect directly
    if (file.startsWith('http')) {
      return NextResponse.redirect(file);
    }

    // For local files (development), this would need local file system access
    // In production with Vercel Blob, files should be accessed via URL
    return NextResponse.json({ 
      error: 'Direct file download not supported. Please use the file URL.',
      suggestion: 'Store and retrieve the blob URL from your database'
    }, { status: 400 });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
