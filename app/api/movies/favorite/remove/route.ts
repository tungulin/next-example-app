import { NextRequest, NextResponse } from 'next/server';
import db from 'app/server/database';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from 'app/server/constants';

export async function POST(req: NextRequest): Promise<Response> {
    const data = await req.json();
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json(
            { message: 'You are not logged in' },
            { status: 401 },
        );
    }

    if (!data.movieId) {
        return NextResponse.json(
            { message: 'Movie is not found' },
            { status: 400 },
        );
    }

    const { movieId } = data;

    const movie = await db('movies').where({ id: movieId }).first();

    if (!movie) {
        return NextResponse.json(
            { message: 'Movie is not found' },
            { status: 400 },
        );
    }

    try {
        var decoded = jwt.verify(token, JWT_TOKEN);

        await db('favoriteMovies')
            .where({
                userId: decoded.userId,
                movieId: movie.id,
            })
            .del();

        return NextResponse.json({ isDeleted: true });
    } catch (err) {
        console.log('err', err);
        return NextResponse.json(
            { message: 'Invalid token. Authorization error' },
            { status: 402 },
        );
    }
}
