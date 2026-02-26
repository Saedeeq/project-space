import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const file = searchParams.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file specified' }, { status: 400 });
    }

    // Security: Prevent directory traversal
    const sanitizedFile = file.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = join(process.cwd(), 'public', 'uploads', sanitizedFile);

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read file
    const fileBuffer = await readFile(filePath);

    // Create response with appropriate headers
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set(
      'Content-Disposition',
      `attachment; filename="${sanitizedFile}"`
    );
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return response;
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
