import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from 'app/server/database';
import { JWT_TOKEN } from 'app/server/constants';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json(
            { message: 'You are not logged in' },
            { status: 401 },
        );
    }

    try {
        var decoded = jwt.verify(token, JWT_TOKEN);

        const user = await db('users')
            .where({ id: decoded.userId })
            .select('users.login')
            .first();

        user.favoriteMovies = await db('favoriteMovies')
            .join('movies', 'movies.id', 'favoriteMovies.movieId')
            .where('favoriteMovies.userId', decoded.userId)
            .select(
                'movies.id',
                'movies.title',
                'movies.year',
                'movies.extract',
                'movies.thumbnail',
                'movies.genres',
                'movies.cast',
            );

        return NextResponse.json({ user });
    } catch (err) {
        console.log('err', err);
        return NextResponse.json(
            { message: 'Invalid token. Authorization error' },
            { status: 402 },
        );
    }
}
