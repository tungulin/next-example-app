import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    try {
        await req.json();
        return NextResponse.next();
    } catch (_error) {
        return NextResponse.json(
            { message: 'Can`t JSON Parse.' },
            { status: 400 },
        );
    }
}

export const config = {
    matcher: '/api/auth ',
};
