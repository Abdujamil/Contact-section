// app/api/login/route.ts

// import {NextResponse} from 'next/server';
// import {PrismaClient} from '@/generated/prisma';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        console.error(req);
        // const {email, password} = await req.json();
        //
        // if (!email || !password) {
        //     return NextResponse.json({error: 'Заполните все поля'}, {status: 400});
        // }
        //
        // const user = await prisma.user.findUnique({where: {email}});
        //
        // if (!user) {
        //     return NextResponse.json({error: 'Пользователь не найден'}, {status: 404});
        // }
        //
        // const passwordMatch = await bcrypt.compare(password, user.password);
        //
        // if (!passwordMatch) {
        //     return NextResponse.json({error: 'Неверный пароль'}, {status: 401});
        // }
        //
        // return NextResponse.json({
        //     message: 'Успешный вход',
        //     user: {id: user.id, email: user.email, username: user.username}
        // });
    } catch (error) {
        console.error(error);
        // return NextResponse.json({error: 'Внутренняя ошибка сервера'}, {status: 500});
    }
}
