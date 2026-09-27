import Link from 'next/link';

const NotFound = () => {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="text-center">

                <p className="text-6xl font-bold">
                    404
                </p>

                <h1 className="mt-4 text-3xl font-bold">
                    PAGE NOT FOUND
                </h1>

                <p className="mt-3 text-gray-500">
                    The page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-[#ffff] px-6 py-3 font-bold text-black"
                >
                    Go Home
                </Link>

            </div>
        </main>
    );
};

export default NotFound;