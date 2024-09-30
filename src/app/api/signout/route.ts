
import {  NextResponse } from 'next/server';

export async function GET() {
  try {
    // Clear the token cookie from the client
    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    response.cookies.delete('token');
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}